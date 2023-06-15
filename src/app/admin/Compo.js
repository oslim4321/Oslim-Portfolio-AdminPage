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
} from "react-admin";

export const ProjectList = (props) => {
  const handleEditClick = (id) => {
    console.log(id, "id");
  };
  const RenderEditButton = (record) => (
    <EditButton onClick={() => handleEditClick(record)} />
  );
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
        <RenderEditButton />
      </Datagrid>
    </List>
  );
};

export const ProjectEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <ImageField
        source="image"
        title="Project Image"
        className="rounded-image" // Apply custom CSS class
        options={{
          style: {
            width: "200px", // Specify the desired width
            height: "auto", // Set height to auto to maintain aspect ratio
            borderRadius: "10px", // Specify the desired border radius
          },
        }}
      />
      <TextField source="id" />
      <TextField source="projectName" />
      <TextField source="studentName" />
      <TextField source="category" />

      {/* Add other fields you want to edit */}
    </SimpleForm>
  </Edit>
);

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
