import * as React from "react";
import {
  Admin,
  Button,
  CreateButton,
  ExportButton,
  Resource,
  TopToolbar,
} from "react-admin";

import {
  deleteProjectAndImages,
  deleteProjectById,
  editProject,
  fetchItemsByCategory,
  getProjectById,
  uploadProject,
} from "@/lib/QueryFirebase";
import { ProjectEdit, ProjectList } from "./Compo";
import ProjectCreate from "./ProjectCreate";
import { buttons } from "@/lib/utilty/arrayList";

// const CreateButton = ({ onClick }) => (

// );
const CustomAppBar = (props) => (
  <AppBar {...props}>
    <span>My Admin Panel</span>
  </AppBar>
);
const Apps = () => {
  const dataProvider = {
    getList: async (resource, params) => {
      console.log(resource, "mee");

      try {
        const projects = await fetchItemsByCategory(resource); // Fetch items based on category
        console.log(projects);
        return {
          data: projects,
          total: projects.length,
        };
      } catch (error) {
        console.error("Error fetching items:", error);
        return {
          data: [],
          total: 0,
        };
      }
    },

    getOne: async (resource, params) => {
      const { id } = params;
      console.log(resource, "resourse");
      console.log(params, "params");
      try {
        const project = await getProjectById(id);
        console.log(project, "proj");
        return { data: project };
      } catch (error) {
        console.error("Error fetching item:", error);
        return { data: null };
      }
    },

    update: async (resource, params) => {
      const { id, data } = params;
      console.log(id, "id", data, "data");
      try {
        const res = await editProject(id, data);
        return { data: res };
      } catch (error) {
        console.log("Error uodating data", error);
        return { data: null };
      }
    },

    create: async (resource, params) => {
      // Implementation for creating a new record
      const { data } = params;
      console.log(data, "here o am");
      try {
        // Perform the necessary operations to create the new record
        const createdRecord = await uploadProject(data);
        return {
          data: createdRecord,
        };
      } catch (error) {
        console.error("Error creating record:", error);
        return {
          error: error.message || "Error creating record",
        };
      }
    },
    /* delete */
    delete: async (resource, params) => {
      const { id } = params;
      console.log(id);

      try {
        // Perform the necessary operations to delete the resource
        const deletedDoc = await deleteProjectById(id);
        console.log("deleted");
        // Return the deleted resource ID
        return { data: deletedDoc };
      } catch (error) {
        console.error("Error deleting record:", error);
        return { error };
      }
    },

    // delete: async (resource, params) => {
    //   const { id } = params;

    //   try {
    //     // Get the project data to retrieve the image URLs
    //     const project = await getProjectById(id);

    //     const projectImages = project.projectImages ?? [];
    //     const image = project.image;

    //     console.log(image, "image");
    //     console.log(projectImages, "projectImage");

    //     // Extract the image URLs from the project data
    //     const imageUrls = projectImages.map((image) => image.url);

    //     // Perform the necessary operations to delete the resource and its associated images
    //     const docDel = await deleteProjectAndImages(id, image, imageUrls);

    //     // Return the deleted resource ID
    //     return { data: docDel };
    //   } catch (error) {
    //     console.error("Error deleting record:", error);
    //     return { error };
    //   }
    // },
  };

  return (
    <Admin dataProvider={dataProvider} appBar={CustomAppBar}>
      {buttons.map((project) => (
        <Resource
          name={project.category}
          list={ProjectList}
          edit={ProjectEdit}
          options={{ label: project.text }}
          filter={{ category: project.category }}
          create={ProjectCreate}
        />
      ))}
    </Admin>
  );
};

export default Apps;

/* list={ListGuesser}
        edit={EditGuesser} */
