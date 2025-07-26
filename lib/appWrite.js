import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appWriteConfig = {
  endpoint: "https://fra.cloud.appwrite.io/v1",
  projectId: "686a6d4d00209bf9456b",
  platform: "com.maher.fastfood",
  bucketAssetsId: "68747a8e0033c31ba128",
  databaseId: "686a708300090bba3f13",
  userCollectionId: "686a70cd002771cad37f",
  categoriesCollectionId: "687474f800327cac09b0",
  menuCollectionId: "687475b10025a54b682b",
  customizationsCollectionId: "6874778f0017b1d28311",
  menuCustomizationsCollectionId: "687478f700194f237f48",
};

export const client = new Client();
client
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
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

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) {
      throw Error;
    }
    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("accountid", currentAccount.$id)]
    );
    if (!currentUser) {
      throw Error;
    }
    return currentUser.documents[0];
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const signOut = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message || "Failed to Logout");
  }
};

export const getMenu = async ({ category, query, limit }) => {
  try {
    const filters = [];
    if (category) {
      filters.push(Query.equal("category", category));
    }
    if (query) {
      filters.push(Query.search("name", query));
    }
    if (limit) {
      filters.push(Query.limit(limit));
    }
    const menu = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.menuCollectionId,
      filters
    );
    return menu.documents;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message || "Failed to retrieve menu");
  }
};

export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.categoriesCollectionId
    );
    return categories.documents;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message || "Failed to retrieve categories");
  }
};

export const getCustomizations = async () => {
  try {
    const customizations = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.customizationsCollectionId
    );
    return customizations.documents;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message || "Failed to retrieve customizations");
  }
};

export const getMenuCustomizations = async () => {
  try {
    const menuCustomizations = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.menuCustomizationsCollectionId
    );
    return menuCustomizations.documents;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message || "Failed to retrieve menu customizations");
  }
};
