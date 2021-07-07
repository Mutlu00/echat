import { User } from '../entity/User';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import argon2 from 'argon2';
import { getConnection } from 'typeorm';
import { MyContext } from 'src/utils/MyContext';

@InputType()
export class UsernamePasswordInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hi!';
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    // you are not logged in
    if (!req.session.userId) {
      return null;
    }

    return User.findOne(req.session.userId);
  }


  @Query(() => Boolean)
  async deleteAllUsers() {
    await User.delete({});
    return true;
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => User)
  async register(
    @Arg('options') options: UsernamePasswordInput
  ): Promise<User> {
    const { email, username, password } = options;
    const hashedPassword = await argon2.hash(password);

    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        username: username,
        email: email,
        password: hashedPassword,
      })
      .returning('*')
      .execute();

    const user = result.raw[0];

    return user;
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes('@')
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );

    if (!user) {
      return {
        errors: [
          { field: 'usernameOrEmail', message: "that username doesn't exist" },
        ],
      };
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return {
        errors: [{ field: 'password', message: 'incorrect password' }],
      };
    }
    if (req.session.userID) {
      console.log(req.session.userID);
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }
}
