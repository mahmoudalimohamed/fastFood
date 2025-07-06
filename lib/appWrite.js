import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const appWriteConfig = {
  endpoint: "https://fra.cloud.appwrite.io/v1",
  projectId: "686a6d4d00209bf9456b",
  platform: "com.maher.fastfood",
  databaseId: "686a708300090bba3f13",
  userCollectionId: "686a70cd002771cad37f",
};

export const client = new Client();
client
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);

export const signIn = async ({ email, password }) => {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const createUser = async ({ email, password, name }) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) {
      throw new Error("Failed to create account");
    }

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name).toString();

    const userDoc = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        email,
        name,
        accountid: newAccount.$id,
        avatar: avatarUrl,
      }
    );

    return { userDoc, newAccount };
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "An error occurred during user creation");
  }
};
