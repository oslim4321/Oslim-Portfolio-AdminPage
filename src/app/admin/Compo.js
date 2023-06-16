import {
  List,
  Edit,
  Datagrid,
  TextField,
  EditButton,
  ImageField,
  SimpleForm,
  Sidebar,
  MenuItemLink,
  Link,
  TextInput,
  FormTab,
  TabbedForm,
  SelectInput,
  ImageInput,
  ArrayInput,
  SimpleFormIterator,
  DeleteButton,
} from "react-admin";

export const ProjectList = (props) => {
  // const getEditUrl = (record) => {
  //   const projectId = record.id; // Get the ID of the project
  //   console.log(projectId, "projectId");
  //   return `/projects/${projectId}/edit`; // Construct the edit URL with the ID parameter
  // };

  return (
    <List {...props}>
      <Datagrid>
        <ImageField
          source="image"
          title="Project Image"
          className="rounded-image" // Apply custom CSS class
          sx={{
            "& img": {
              maxWidth: 100,
              maxHeight: 50,
              objectFit: "contain",
              borderRadius: 100,
            },
          }}
        />
        <TextField source="id" />
        <TextField source="projectName" />
        <TextField source="studentName" />
        <TextField source="category" />
        {/* Add other fields you want to display */}
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export const ProjectEdit = (props) => {
  const handleSubmit = async (values) => {
    // Perform the save operation here
    const { id, ...data } = values; // Extract the ID and other data from the form values
    console.log(values);
    //  try {
    //    await updateProject(id, data); // Assuming you have a function to update the project in the database
    //    // Handle success, e.g., show a success message or navigate to another page
    //  } catch (error) {
    //    // Handle error, e.g., show an error message
    //  }
  };
  return (
    <Edit {...props}>
      <TabbedForm>
        <FormTab label="Details">
          <ImageField source="image" title="Project Image" />

          <ImageInput
            source="image"
            label="Project Image"
            accept="image/*"
            multiple={false}
          ></ImageInput>
          <TextInput source="projectName" label="Project Name" />
          <TextInput source="studentName" label="Student Name" />
          <TextInput source="gitHubLink" label="Github Link" />
          <TextInput source="projectLink" label="Project Link" />
          <SelectInput
            source="category"
            label="Category"
            defaultValue="category"
            choices={[
              { id: "client-work", name: "Client Work" },
              { id: "personal-projects", name: "Personal Projects" },
              { id: "school-project", name: "School Project" },
              { id: "freelance-projects", name: "Freelance Projects" },
              { id: "my-css-student-works", name: "My CSS Student Works" },
            ]}
          />
          {/* Add other fields you want to edit */}
        </FormTab>
        <FormTab label="Description">
          <TextInput
            source="projectDesc"
            label="Project Description"
            multiline
            fullWidth
            style={{ width: "100%" }}
          />
          {/* Add other fields you want to edit */}
        </FormTab>
        <FormTab label="Technologies">
          <ArrayInput source="technologies" label="Technologies">
            <SimpleFormIterator>
              <TextInput />
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

const customProjectDescField = (props) => {
  const { record } = props;
  const truncatedDesc = record.projectDesc.split(" ").slice(0, 20).join(" ");
  return <span>{truncatedDesc}</span>;
};

// const ProjectList = (props) => (
//   <List {...props}>
//     <Datagrid>
//       <TextField source="id" />
//       <TextField source="projectName" />
//       <TextField source="egory" />
//       <TextField source="createdAt" />
//       {/* Add other fields you want to display */}
//       <EditButton />
//     </Datagrid>
//   </List>
// );

// const ProjectEdit = (props) => (
//   <Edit {...props}>
//     <SimpleForm>
//       <TextField source="id" />
//       <TextField source="projectName" />
//       <TextField source="egory" />
//       <TextField source="createdAt" />
//       {/* Add other fields you want to edit */}
//     </SimpleForm>
//   </Edit>
// );

export const ProjectShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="projectName" />
      <TextField source="egory" />
      <TextField source="createdAt" />
      <FunctionField
        label="Project Description"
        render={customProjectDescField}
      />
      {/* Add other fields you want to show */}
    </SimpleShowLayout>
  </Show>
);

// export const CustomLayout = (props) => (
//   <Layout {...props}>
//     <Menu {...props}>
//       <MenuItemLink to="/" primaryText="Home" />
//       <MenuItemLink to="/users" primaryText="Users" />
//       <MenuItemLink to="/posts" primaryText="Posts" />
//     </Menu>
//   </Layout>
// );

const CustomSidebar = () => {
  const translate = useTranslate();
  const resources = getResources();

  return (
    <Sidebar>
      {resources.map((resource) => (
        <MenuItemLink
          key={resource.name}
          to={`/${resource.name}`}
          primaryText={translate(`resources.${resource.name}.name`)}
        />
      ))}
      {/* Add additional menu items as needed */}
    </Sidebar>
  );
};

export default CustomSidebar;
