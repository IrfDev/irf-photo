const DOMAIN_URL = "https://cms.irving.suarez.digital/wp-json/wp/v2";

type CustomRelationship = {
  post_type: string;
  ID: any;
};

export async function getHome() {
  const postsRes = await fetch(DOMAIN_URL + "/photography_home");
  const posts = await postsRes.json();

  return posts[0].acf;
}

export async function getGallery(post_name: string) {
  const postsRes = await fetch(
    DOMAIN_URL + "/photo_gallery" + `?slug=${post_name}`
  );

  const posts = await postsRes.json();
  const post = posts[0];
  return {
    ...post,
    ...post.acf,
    acf: null,
  };
}

export async function getHomeData(): Promise<HomeDataType | undefined> {
  try {
    let homeBaseSchema = await getHome();

    let arrayOfPromises = Object.keys(homeBaseSchema).flatMap(
      async (keyName) => {
        let fieldSchema = homeBaseSchema[keyName];

        if (!fieldSchema) {
          return;
        }

        let newFieldArrayOfPromises = Object.keys(fieldSchema).flatMap(
          async (fieldKeyName) => {
            let sectionSchema = fieldSchema[fieldKeyName];

            if (Array.isArray(sectionSchema)) {
              let arrayOfRel = await Promise.all(
                sectionSchema.map(
                  async ({ post_type, ID }: CustomRelationship) => {
                    console.log("post_type, ID", post_type, ID);
                    let relationshipJoined = await getFields(post_type, ID);

                    return relationshipJoined;
                  }
                )
              );

              fieldSchema[fieldKeyName] = arrayOfRel;
            }
            return;
          }
        );

        await Promise.all(newFieldArrayOfPromises);

        homeBaseSchema[keyName] = {
          ...fieldSchema,
        };
      }
    );

    await Promise.all(arrayOfPromises);

    let photo_topics = await getTopics();

    if (photo_topics) {
      homeBaseSchema.photo_topics = photo_topics;
    }
    return homeBaseSchema;
  } catch (error) {
    console.error(error);
  }
}

export async function getFields(post_type: string, post_id: string[]) {
  const postsRes = await fetch(`${DOMAIN_URL}/${post_type}/${post_id}`);

  const posts = await postsRes.json();

  return { ...posts, ...posts.acf, acf: null, _links: null };
}

export async function getTopics() {
  const postsRes = await fetch(`${DOMAIN_URL}/photo_topics?`);

  const posts = await postsRes.json();

  return posts.map((post: PhotoTopicType) => ({
    ...post,
    ...post.acf,
    acf: null,
    _links: null,
  }));
}

export async function getGalleries() {
  const postsRes = await fetch(`${DOMAIN_URL}/photo_gallery?`);

  const posts = await postsRes.json();

  return posts.map((post: PhotoTopicType) => ({
    ...post,
    ...post.acf,
    acf: null,
    _links: null,
  }));
}

export async function getTopic(slug: string) {
  const postsRes = await fetch(`${DOMAIN_URL}/photo_topics?slug=${slug}`);

  const [topic] = await postsRes.json();

  return topic;
}

export async function getPhotoTopics(photo_topic_id: string | number) {
  const postsRes = await fetch(
    `${DOMAIN_URL}/media?photo_topics=${photo_topic_id}`
  );

  const posts = await postsRes.json();

  return { ...posts, ...posts.acf, acf: null, _links: null };
}

export async function getTopicPageData(slug: string) {
  const topic: PhotoTopicType = await getTopic(slug);
  const medias: WpImage[] = await getPhotoTopics(topic.id);

  return {
    ...topic,
    medias,
  };
}
export async function getGalleryPageData(slug: string) {
  const gallery: GalleryType = await getGallery(slug);

  return {
    ...gallery,
  };
}
