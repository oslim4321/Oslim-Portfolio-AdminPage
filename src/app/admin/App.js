import * as React from "react";
import { Admin, Resource } from "react-admin";

import { fetchItemsByCategory } from "@/lib/QueryFirebase";
import { ProjectEdit, ProjectList } from "./Compo";

const Apps = () => {
  const dataProvider = {
    getList: async (resource, params) => {
      console.log(resource, "mee");
      if (resource === "my-css-student-works") {
        resource = resource.replace(/-|_/g, " ");
      }
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

    // Implement other dataProvider methods as per your requirement
  };

  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="client-work"
        list={ProjectList}
        edit={ProjectEdit}
        options={{ label: "Client Works" }}
        filter={{ category: "client-work" }} // Pass the category as a filter
      />
      <Resource
        name="school-project"
        list={ProjectList}
        edit={ProjectEdit}
        options={{ label: "School Project" }}
        filter={{ category: "school-project" }} // Pass the category as a filter
      />
      <Resource
        name="my-css-student-works"
        list={ProjectList}
        edit={ProjectEdit}
        options={{ label: "My CSS Student Works" }}
        filter={{ category: "my css student works" }}
      />
    </Admin>
  );
};

export default Apps;

/* list={ListGuesser}
        edit={EditGuesser} */
