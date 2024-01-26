import axios from "axios";
import assert from "assert";
import {
  getReport,
  setReport,
  setUserData,
  getUserData,
} from "../helper/helper.mjs";
import customerData from "../../test/data/custData.mjs";
let statusCode, dataToValidate;

class apiObject {
  async getMethod() {
    try {
      const response = await axios.get(process.env.API_URL, {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      });
      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);
      statusCode = response.status;
      setReport(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  async postMethod(paramData) {
    dataToValidate = paramData;
    const data = customerData[dataToValidate];
    try {
      const response = await axios.post(
        process.env.API_URL,
        {
          name: data.name,
          email: data.email,
          gender: data.gender,
          status: data.status,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response Status:", response.status);
      console.log("User created:", response.data.data);
      statusCode = response.status;
      setReport(response.data);
    } catch (error) {
      console.error("Error Status Code:", error.response.status);
      console.error("Error creating user:", error.message);
    }
  }

  async putMethod(updatedName) {
    // Get user data from getData function
    const dataUser = getUserData();
    console.log("Data User :", dataUser);
    try {
      const response = await axios.put(
        process.env.API_URL + `/${dataUser.id}`,
        {
          name: updatedName,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response Status:", response.status);
      console.log("User updated:", response.data.data);
      statusCode = response.status;
      setUserData(response.data.data);
      setReport(response.data);
    } catch (error) {
      console.error("Error Status Code:", error.response.status);
      console.error("Error creating user:", error.message);
    }
  }

  async deleteMethod() {
    // // Get the user id of the latest data
    // let userId;
    // try {
    //   const response = await axios.get(process.env.API_URL + `?limit=1`, {
    //     headers: {
    //       Authorization: `Bearer ${process.env.API_TOKEN}`,
    //     },
    //   });
    //   if (response.data.data.length > 0) {
    //     userId = response.data.data[0].id;
    //     console.log("First User Data:", userId);
    //   } else {
    //     console.log("No user data available.");
    //   }
    // } catch (error) {
    //   console.error("Error:", error.message);
    // }

    // Get user data from getData function
    const dataUser = getUserData();
    console.log("Data User :", dataUser);
    try {
      const response = await axios.delete(
        process.env.API_URL + `/${dataUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response Status:", response.status);
      console.log("User deleted:", response.data.data);
      statusCode = response.status;
      setReport(response.data);
    } catch (error) {
      console.error("Error Status Code:", error.response.status);
      console.error("Error creating user:", error.message);
    }
  }

  async getData() {
    try {
      const response = await axios.get(process.env.API_URL + `?limit=1`, {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      });

      if (response.data.data.length > 0) {
        const firstUserData = response.data.data[0];
        console.log("First User Data:", firstUserData);
        setUserData(firstUserData);
        console.log("The Data has been collected: ", getUserData());
        setReport(firstUserData);
      } else {
        console.log("No user data available.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  async validateData() {
    const myData = getUserData();
    console.log("My User Data :", myData);
    try {
      const response = await axios.get(process.env.API_URL + `/${myData.id}`, {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      });

      if (response.data.data) {
        const dataUser = response.data.data;
        // Assert specific properties of the user data
        assert.equal(dataUser.id, myData.id, "ID should match");
        assert.equal(dataUser.email, myData.email, "Emails should match");
        assert.equal(dataUser.name, myData.name, "Name should match");
        assert.equal(dataUser.gender, myData.gender, "Gender should match");
        assert.equal(dataUser.status, myData.status, "Status should match");
        console.log("Assertions passed successfully.");
        setReport(dataUser);
      } else {
        console.error("No user data available.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  async validatePostData() {
    const data = customerData[dataToValidate];
    try {
      const response = await axios.get(process.env.API_URL, {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      });

      // Validate by email
      if (response.data.data.length > 0) {
        const dataUser = response.data.data.find(
          (user) => user.email === data.email
        );

        if (dataUser) {
          console.log("User data by email:", dataUser);
          // Assert specific properties of the user data
          assert.equal(dataUser.email, data.email, "Emails should match");
          assert.equal(dataUser.name, data.name, "Name should match");
          assert.equal(dataUser.gender, data.gender, "Gender should match");
          assert.equal(dataUser.status, data.status, "Status should match");
          console.log("Assertions passed successfully.");
          setReport(dataUser);
        } else {
          console.log("User not found with the specified email.");
          setReport("User not found with the specified email.");
        }
      } else {
        console.log("No user data available.");
        setReport("No user data available.");
      }
    } catch (error) {
      console.error("Error getting user data by email:", error.message);
    }
  }

  async validateDeletedData() {
    const myData = getUserData();
    console.log("My User Data :", myData);
    try {
      const response = await axios.get(process.env.API_URL + `/${myData.id}`, {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      });

      if (response.status === 404) {
        console.error("User data not found.");
        setReport("User data not found.");
      } else {
        const dataUser = response.data.data;

        // process the user data if found
        console.log("User data found:", dataUser);
        setReport(dataUser);
      }
    } catch (error) {
      // handle other errors
      setReport("Error: " + error.message);
      console.error("Error:", error.message);
    }
  }

  async verifyStatusCode(status) {
    assert.equal(
      statusCode,
      status,
      "The expected Status Code is: " +
        status +
        " and the Actual Status Code is: " +
        statusCode
    );
    setReport("Matched Status Code : " + statusCode);
  }

  async deleteMethodWithUserId(userId) {
    try {
      const response = await axios.delete(process.env.API_URL + `/${userId}`, {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Response Status:", response.status);
      console.log("User deleted:", response.data.data);
      statusCode = response.status;
      setReport(response.data);
    } catch (error) {
      console.error("Error Status Code:", error.response.status);
      console.error("Error creating user:", error.message);
    }
  }

  async validateDeletedWithUserId(userId) {
    try {
      const response = await axios.get(process.env.API_URL + `/${userId}`, {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      });

      if (response.data.data.length > 0) {
        const firstUserData = response.data.data[0];
        console.log("First User Data:", firstUserData);
        setReport(firstUserData);
      } else {
        console.log("No user data available.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
}

const api_test = new apiObject();
export default api_test;
