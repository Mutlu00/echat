import { MyContext } from '../utils/MyContext';
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Images } from '../entity/Images';
import { isAuth } from '../middleware/isAuth';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { fileUpload } from '../utils/fileUpload';

type ImageTypes = 'profile' | 'cover' | 'secondary';

// @InputType()
// class ImageTypes {
//   @Field()
//   type: 'profile' | 'cover' | 'secondary';
// }

@Resolver()
export class ImagesResolver {
  @Query(() => [Images], { nullable: true })
  @UseMiddleware(isAuth)
  async userImages(
    @Arg('type') type: ImageTypes,
    @Ctx() { req }: MyContext
  ): Promise<Images[]> {
    const userId = req.session.userId;
    const images = await Images.find({ where: { userId, type } });
    return images;
  }

  @Mutation(() => [Images])
  @UseMiddleware(isAuth)
  async multipleUpload(
    @Arg('type') type: ImageTypes,
    @Arg('files', () => [GraphQLUpload]) files: [FileUpload],
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session;

    for (let file of files) {
      const url = await fileUpload(file);
      console.log(url);
      await Images.create({ url, userId, type }).save();
    }

    const images = await Images.find({ where: { userId, type } });

    return images;
  }
}
