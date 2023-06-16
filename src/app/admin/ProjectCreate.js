import React from "react";
import {
  ArrayInput,
  Create,
  FormTab,
  ImageInput,
  SelectInput,
  SimpleFormIterator,
  TabbedForm,
  TextInput,
} from "react-admin";

const ProjectCreate = (props) => {
  return (
    <Create {...props} title="Create Project">
      <TabbedForm>
        <FormTab label="Details">
          <ImageInput
            source="image"
            label="Project Image"
            accept="image/*"
            multiple={false}
          />

          <TextInput source="projectName" label="Project Name" />
          <TextInput source="studentName" label="Student Name" />
          <TextInput source="gitHubLink" label="GitHub Link" />
          <TextInput source="projectLink" label="Project Link" />
          <SelectInput
            source="category"
            label="Category"
            choices={[
              { id: "client-work", name: "Client Work" },
              { id: "personal-projects", name: "Personal Projects" },
              { id: "school-project", name: "School Project" },
              { id: "freelance-projects", name: "Freelance Projects" },
              { id: "my-css-student-works", name: "My CSS Student Works" },
            ]}
          />
          {/* Add other fields you want to include */}
        </FormTab>
        <FormTab label="Description">
          <TextInput
            source="projectDesc"
            label="Project Description"
            multiline
            fullWidth
            style={{ width: "100%" }}
          />
          {/* Add other fields you want to include */}
        </FormTab>
        <FormTab label="Technologies">
          <ArrayInput source="technologies" label="Technologies">
            <SimpleFormIterator>
              <TextInput />
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>

        {/* multiple image */}
        <FormTab label="Images">
          <ArrayInput source="projectImages" label="Project Images">
            <SimpleFormIterator>
              <ImageInput
                source="url"
                label="Image"
                accept="image/*"
                multiple={false}
              />
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>
      </TabbedForm>
    </Create>
  );
};

export default ProjectCreate;
