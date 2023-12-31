import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "./utilty/firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  refFromURL,
} from "firebase/storage";

// Function to fetch items based on category
// export const fetchItemsByCategory = async (category) => {
//   console.log("started fetchiong");

//   const colRef = collection(db, "projects");

//   try {
//     const q = query(colRef, where("category", "==", category));
//     const snapshot = await getDocs(q);

//     const items = snapshot.docs.map((doc) => doc.data(), id: doc.id);
//     return items;
//   } catch (error) {
//     console.error("Error fetching items:", error);
//     return [];
//   }
// };
export const fetchItemsByCategory = async (category) => {
  console.log("started fetching");

  const colRef = collection(db, "projects");

  try {
    const q = query(colRef, where("category", "==", category));
    const snapshot = await getDocs(q);

    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return items;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};

export async function getData() {
  let project = [];
  try {
    // setloading(true);
    const colRef = collection(db, "projects");

    const q = query(colRef, where("category", "==", "client-work"));
    const res = await getDocs(q);
    res.docs.forEach((doc) => {
      project.push({ ...doc.data(), id: doc.id });
    });
    if (project.length < 1) {
      console.log("check internet connection");
    }
    console.log(project, "lol");
    return project;
  } catch (error) {
    throw Error;
    // return error;
  } finally {
    // setloading(false);
  }
}

export const getProjectById = async (id) => {
  let project;
  try {
    const colRef = doc(db, "projects", id);
    const res = await getDoc(colRef);
    project = { ...res.data(), id: res.id };
    return project;
  } catch (error) {
    console.log(error);
  }
};

export const editProject = async (id, data) => {
  try {
    const docRef = doc(db, "projects", id);
    const updateData = await updateDoc(docRef, data);

    console.log("Document successfully updated!");
    return updateData;
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

/* upload */

const uploadImageToStorage = async (image) => {
  console.log(image, "file");
  if (!image || !image || !image.name) {
    console.log("image is null jare");
    return null; // Return null if the image or its name is missing
  }
  const randomNumber = Math.floor(Math.random() * 2000);
  const storageRef = ref(storage, "images/" + image.name + randomNumber);
  const img = await uploadBytes(storageRef, image);
  console.log(img, "uploaded");
  return getDownloadURL(storageRef);
};

export const uploadProject = async (data) => {
  const {
    image,
    projectName,
    studentName,
    gitHubLink,
    projectLink,
    projectDesc,
    category,
    technologies,
    projectImages,
  } = data;

  console.log(image, "tppe");
  try {
    const colRef = collection(db, "projects");
    const imageDownloadURL = image
      ? await uploadImageToStorage(image.rawFile)
      : null;

    const imageUrls = await Promise.all(
      projectImages?.map(async (image) => {
        return await uploadImageToStorage(image.url.rawFile);
      })
    );
    // Build the project object with optional properties
    const projectData = {
      image: imageDownloadURL,
      projectImages: imageUrls,
      projectName,
      projectDesc,
      gitHubLink: gitHubLink || "", // Use an empty string as default value if gitHubLink is undefined
      projectLink,
      studentName: studentName || "", // Use an empty string as default value if studentName is undefined
      category,
      technologies,
      createdAt: serverTimestamp(),
    };

    // Remove undefined properties from projectData object
    const filteredProjectData = Object.fromEntries(
      Object.entries(projectData).filter(([_, value]) => value !== undefined)
    );

    const createProject = await addDoc(colRef, filteredProjectData);

    // // Reset the form or show a success message
    // console.log("Project added successfully!");
    return "data uploaded success";
  } catch (error) {
    console.error("Error adding project:", error);
  }
};

/* delete project */

export const deleteProjectById = async (projectId, image, imageUrls) => {
  try {
    // Delete project data from Firestore
    const projectRef = doc(db, "projects", projectId);
    await deleteDoc(projectRef);

    // Delete associated images from Firebase Storage
    if (imageUrls && imageUrls.length > 0) {
      const imageDeletionPromises = imageUrls.map(async (imageUrl) => {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
        console.log(`Image ${imageUrl} deleted successfully`);
      });
      await Promise.all(imageDeletionPromises);
    }

    console.log("Project and associated images deleted successfully");
    // Optionally, you can handle any additional logic or UI updates after the project and images are deleted
  } catch (error) {
    console.error("Error deleting project and associated images:", error);
    // Handle the error or display an error message to the user
  }
};

// export const deleteProjectAndImages = async (projectId, image, imageUrls) => {
//   try {
//     // Delete project data from Firestore
//     const projectRef = doc(db, "projects", projectId);
//     await deleteDoc(projectRef);

//     // Delete associated images from Firebase Storage
//     if (imageUrls && imageUrls.length > 0 && image) {
//       const imageDeletionPromises = imageUrls.map(async (imageUrl) => {
//         const imageRef = refFromURL(imageUrl);
//         await deleteObject(imageRef);
//         console.log(`Image ${imageUrl} deleted successfully`);
//       });
//       await Promise.all(imageDeletionPromises);
//     }
//     // Delete the image specified by the URL
//     // if (image) {
//     //   await deleteImageByUrl(image);
//     // }

//     console.log("Project and associated images deleted successfully");
//     // Optionally, you can handle any additional logic or UI updates after the project and images are deleted
//   } catch (error) {
//     console.error("Error deleting project and associated images:", error);
//     // Handle the error or display an error message to the user
//   }
// };
