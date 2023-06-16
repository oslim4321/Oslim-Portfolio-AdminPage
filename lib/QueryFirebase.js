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
} from "firebase/firestore";
import { db, storage } from "./utilty/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
    const imageDownloadURL = image
      ? await uploadImageToStorage(image.rawFile)
      : null;
    const colRef = collection(db, "projects");

    const imageUrls = await Promise.all(
      projectImages?.map(async (image) => {
        return await uploadImageToStorage(image.rawFile);
      })
    );

    const createProject = await addDoc(colRef, {
      image: imageDownloadURL,
      projectImages: imageUrls,
      projectName,
      projectDesc,
      gitHubLink,
      projectLink,
      studentName,
      category,
      technologies,
      createdAt: serverTimestamp(),
    });

    // // Reset the form or show a success message
    // console.log("Project added successfully!");
    return createProject;
  } catch (error) {
    console.error("Error adding project:", error);
  }
};
