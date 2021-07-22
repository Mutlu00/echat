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
  @Mutation(() => Boolean)
  async deleteAllImages() {
    Images.delete({});
    return true;
  }

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
      const res = await fileUpload(file);
      console.log(res.secure_url);
      await Images.create({
        url: res.secure_url,
        publicId: res.public_id,
        userId,
        type,
      }).save();
    }

    const images = await Images.find({ where: { userId, type } });

    return images;
  }

  @Mutation(() => [Images])
  @UseMiddleware(isAuth)
  async singleUpload(
    @Arg('type') type: ImageTypes,
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Ctx() { req }: MyContext
  ) {
    let userId = req.session.userId;

    const res = await fileUpload(file);

    await Images.create({
      url: res.secure_url,
      publicId: res.public_id,
      userId,
      type,
    }).save();

    const images = await Images.find({ where: { userId: type } });

    return images;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteImage(
    @Arg('publicId') publicId: string,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session;

    await Images.delete({ publicId, userId });

    return true;
  }
}
