import React, { useState } from "react";
import InventoryTable from "./InventoryTable";
import NavigationBar from "./NavBar";
import AddLocationForm from "./AddLocationForm";
import styled from "styled-components";
const Heading = styled.h1`
  padding-bottom: 2rem;
`;
const MainBox = styled.div`
  width: 60%;
  margin: 3rem;
  padding: 4rem;
`;
const AddButton = styled.button`
  font-weight: 900;
  font-size: larger;
  border-radius: 50%;
  background: none;
  border: 1px solid;
  padding: 2px 8px;
  margin-top: 0.5rem;
  margin-left: 90%;
`;

const HomePage = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleAddLocation = (values) => {
    console.log("Adding location:", values);
  };
  return (
    <MainBox>
      <Heading>Inventroy</Heading>
      <div>
        <NavigationBar />
        <AddButton onClick={() => setModalVisible(true)}>+</AddButton>
        <AddLocationForm
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleAddLocation}
          countries={[]}
        />
        <InventoryTable />
      </div>
    </MainBox>
  );
};
export default HomePage;
