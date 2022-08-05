import React, { useEffect, useState } from "react";
import { Text, View, Pressable, Image } from "react-native";
import Button from "../../components/Button/Button";
import { style } from "./Permision.style";

import Layout from "../../general_components/Layout";

const Permision = () => {
  return (
    <Layout>
      <Layout.Header></Layout.Header>
      <Layout.Body></Layout.Body>
      <Layout.Footer>
        <Image
          style={style.image}
          source={require("../../assets/permisionInfo.png")}
        />
        <Text style={style.textDescription}>
          Get to know our privacy practices, how we collect and process data,
          and your choices about how information is used, in a format that is
          easy to read and navigate.
        </Text>
        <Text style={style.textNotes}>Read Privacy Notice</Text>
        <Button isSecondary={true} text={"CONTINUE"} marginBottom={60} />
      </Layout.Footer>
    </Layout>
  );
};

export default Permision;
