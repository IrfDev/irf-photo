const DOMAIN_URL = "https://cms.irving.suarez.digital/wp-json/wp/v2";

type CustomRelationship = {
  fieldName: string;
  posts: any[];
};

export async function getHome() {
  const postsRes = await fetch(DOMAIN_URL + "/home");
  const posts = await postsRes.json();

  return posts[0].acf;
}

function getRelationShipFields(postObject: any) {
  let relationshipFields = Object.keys(postObject).flatMap((fieldName) => {
    let field = postObject[fieldName];

    let isRelationShipField =
      Array.isArray(field) &&
      field.some(
        ({ post_type }) =>
          typeof post_type === "string" && post_type !== "attachment"
      );

    if (isRelationShipField) {
      return {
        fieldName,
        posts: field,
      } as CustomRelationship;
    } else {
      return [];
    }
  });

  return relationshipFields;
}

export async function getGalleryIndividual(post_name: string) {
  const postsRes = await fetch(
    DOMAIN_URL + "/photo_gallery" + `?slug=${post_name}`
  );

  const posts = await postsRes.json();

  return posts[0].acf;
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
              let joinedSchema = await getFields(
                fieldSchema.post_type,
                fieldSchema.ID
              );

              let relationshipFields = getRelationShipFields(joinedSchema);

              await Promise.all(
                relationshipFields.map(
                  async ({ posts, fieldName }: CustomRelationship) => {
                    let relationshipJoined = await Promise.all(
                      posts.map((post) => getFields(post.post_type, post.ID))
                    );

                    joinedSchema[fieldName] = relationshipJoined;
                  }
                )
              );

              fieldSchema[fieldKeyName] = joinedSchema;
              return;
            } else {
              return [];
            }
          }
        );

        await Promise.all(newFieldArrayOfPromises);

        homeBaseSchema[keyName] = {
          ...fieldSchema,
        };
      }
    );

    await Promise.all(arrayOfPromises);

    return homeBaseSchema;
  } catch (error) {
    console.error(error);
  }
}

export async function getFields(post_type: string, post_id: string[]) {
  const postsRes = await fetch(`${DOMAIN_URL}/${post_type}/${post_id}`);

  const posts = await postsRes.json();

  return { ...posts, ...posts.acf };
}
