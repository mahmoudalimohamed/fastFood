import { ID } from "react-native-appwrite";
import { appWriteConfig, databases, storage } from "./appWrite";
import dummyData from "./data";

// ensure dummyData has correct shape
const data = dummyData;

async function clearAll(collectionId) {
  const list = await databases.listDocuments(
    appWriteConfig.databaseId,
    collectionId
  );

  await Promise.all(
    list.documents.map((doc) =>
      databases.deleteDocument(appWriteConfig.databaseId, collectionId, doc.$id)
    )
  );
}

async function clearStorage() {
  const list = await storage.listFiles(appWriteConfig.bucketAssetsId);

  await Promise.all(
    list.files.map((file) =>
      storage.deleteFile(appWriteConfig.bucketAssetsId, file.$id)
    )
  );
}

async function seed() {
  // 1. Clear all
  console.log("Clearing all data...");
  await clearAll(appWriteConfig.categoriesCollectionId);
  await clearAll(appWriteConfig.customizationsCollectionId);
  await clearAll(appWriteConfig.menuCollectionId);
  await clearAll(appWriteConfig.menuCustomizationsCollectionId);
  await clearStorage();
  console.log("All data cleared.");

  // 2. Create Categories
  console.log("Creating categories...");
  const categoryMap = {};
  for (const cat of data.categories) {
    const doc = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.categoriesCollectionId,
      ID.unique(),
      cat
    );
    categoryMap[cat.name] = doc.$id;
  }
  console.log("Categories created.");

  // 3. Create Customizations
  console.log("Creating customizations...");
  const customizationMap = {};
  for (const cus of data.customizations) {
    const doc = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.customizationsCollectionId,
      ID.unique(),
      {
        name: cus.name,
        price: cus.price,
        type: cus.type,
      }
    );
    customizationMap[cus.name] = doc.$id;
  }
  console.log("Customizations created.");

  // 4. Create Menu Items
  console.log("Creating menu items...");
  const menuMap = {};
  for (const item of data.menu) {
    const doc = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.menuCollectionId,
      ID.unique(),
      {
        name: item.name,
        description: item.description,
        image_url: item.image_url,
        price: item.price,
        rating: item.rating,

        categories: categoryMap[item.category_name],
      }
    );

    menuMap[item.name] = doc.$id;

    // 5. Create menu_customizations
    for (const cusName of item.customizations) {
      await databases.createDocument(
        appWriteConfig.databaseId,
        appWriteConfig.menuCustomizationsCollectionId,
        ID.unique(),
        {
          menu: doc.$id,
          customizations: customizationMap[cusName],
        }
      );
    }
  }
  console.log("Menu items created.");

  console.log("✅ Seeding complete.");
}

export default seed;
