import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import { object, string, number } from "yup";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function FormCreate() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const mobilephoneRegExp = /^[6789]\d{9}$/;
    const emerphoneRegExp = /^[6789]\d{9}$/;
    const aadharRegExp = /^\d{12}$/;
    const panRegExp = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
    const sexRegExp = /^(male|female|others)$/;
    let userSchema = object({
      name: string().required("Name Field is required"),
      age: number()
        .required("Age Field is required")
        .positive()
        .integer()
        .typeError("Age Field must be number"),
      sex: string()
        .required("Sex Field is required")
        .matches(sexRegExp, "Select one Gender"),
      emergencyContact: string().matches(
        emerphoneRegExp,
        "emergencyNumber is not valid"
      ).optional(),
      mobileNumber: string().matches(mobilephoneRegExp, "mobileNumber is not valid").optional(),
      aadhar: string().matches(aadharRegExp, "aadhar is not valid"),
      pan: string().matches(panRegExp, "pan is not valid"),
    });
    let defaultObj = {
      name: name,
      age: age,
      sex: sex,
    };
    if (idType === "aadhar") {
      defaultObj["aadhar"] = govtID;
    } else if (idType === "pan") {
      defaultObj["pan"] = govtID;
    }
    if(mobileNumber!==""){
      defaultObj["mobileNumber"] = mobileNumber;
    }
    if(emergencyContact!==""){
      defaultObj["emergencyContact"] =emergencyContact;
    }
    const parsedUser = userSchema.validate(defaultObj);
    parsedUser
      .then(() => {
        setLoading(true);
        defaultObj = {
          ...defaultObj,
          guardian: guardian,
          email: email,
          emergencyContact: emergencyContact,
          address: address,
          state: state !== "-1" ? state : "",
          city: city !== "-1" ? city : "",
          country: country !== "-1" ? country : "",
          pincode: pincode,
          occupation: occupation,
          religion: religion !== "-1" ? religion : "",
          Marital_Status: Marital_Status !== "-1" ? Marital_Status : "",
          Blood_Group: Blood_Group !== "-1" ? Blood_Group : "",
          Nationality: Nationality !== "-1" ? Nationality : "",
        };
        if (idType === "aadhar") {
          defaultObj["pan"] = "";
        } else if (idType === "pan") {
          defaultObj["aadhar"] = "";
        } else {
          defaultObj["aadhar"] = "";
          defaultObj["pan"] = "";
        }
        defaultObj["mobileNumber"] = mobileNumber;//for representing empty value if incase
        defaultObj["emergencyContact"] =emergencyContact;//for representing empty value if incase
        async function postData(url = "", data = {}) {
          const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
          });
          return response;
        }

        postData("https://quizbackend-x9lu.onrender.com/form", defaultObj).then(
          (data) => {
            if (data.status === 200) {
              reset();
            }
            console.log("data", data);
          }
        );
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  };
  function reset() {
    setName("");
    setAge("");
    setSex("-1");
    setMobileNumber("");
    setidType("-1");
    setGovtID("");
    setGuardian("");
    setEmail("");
    setEmergencyContact("");
    setAddress("");
    setState("-1");
    setCity("-1");
    setCountry("-1");
    setPincode("");
    setOccupation("");
    setReligion("-1");
    setMarital_Status("-1");
    setBlood_Group("-1");
    setNationality("-1");
  }
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("-1");
  const [mobileNumber, setMobileNumber] = useState("");
  const [idType, setidType] = useState("-1");
  // const [aadhar,setAadhar]=useState("")
  // const [pan,setPan]=useState("")
  const [govtID, setGovtID] = useState("");
  const [guardian, setGuardian] = useState("");
  const [email, setEmail] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("-1");
  const [city, setCity] = useState("-1");
  const [country, setCountry] = useState("-1");
  const [pincode, setPincode] = useState("");
  const [occupation, setOccupation] = useState("");
  const [religion, setReligion] = useState("-1");
  const [Marital_Status, setMarital_Status] = useState("-1");
  const [Blood_Group, setBlood_Group] = useState("-1");
  const [Nationality, setNationality] = useState("-1");
  const [loading, setLoading] = useState(false);
  return (
    <Form onSubmit={handleSubmit} className="p-5">
      <h5 className="text-decoration-underline">Personal Details</h5>
      <Stack
        direction="horizontal"
        className="flex-wrap justify-content-start align-items-center"
        gap={3}
      >
        <Form.Group
          as={Row}
          className="mb-3 w-25"
          controlId="formPlaintextEmail"
        >
          <Form.Label column sm="3">
            <span>
              Name<span style={{ color: "red" }}>*</span>
            </span>
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              required
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3 w-70 align-items-center"
          controlId="formBasicPassword"
        >
          <Form.Label column sm="3" className="w-25">
            Date of Birth or <br />
            <span>
              Age<span style={{ color: "red" }}>*</span>
            </span>
          </Form.Label>
          <Col sm="9">
            <Form.Control
              value={age}
              required
              onChange={(e) => setAge(e.target.value)}
              type="text"
              placeholder="DD/MM/YYYY or Age in Years"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="3">
            <span>
              Sex<span style={{ color: "red" }}>*</span>
            </span>
          </Form.Label>
          <Col sm="9">
            <Form.Select
              required
              aria-label="Default select example"
              onChange={(e) => setSex(e.target.value)}
              value={sex}
            >
              <option hidden value="-1">
                Enter Sex
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">others</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3 align-items-center"
          controlId="formPlaintextEmail"
        >
          <Form.Label column sm="3">
            Mobile Number
          </Form.Label>
          <Col sm="9">
            <Form.Control
              onChange={(e) => setMobileNumber(e.target.value)}
              value={mobileNumber}
              type="text"
              placeholder="Enter Mobile"
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3 align-items-center"
          controlId="formPlaintextEmail"
        >
          <Form.Label column sm="2">
            Govt Issued ID
          </Form.Label>
          <Col sm="10">
            <Stack direction="horizontal" gap={3}>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setidType(e.target.value)}
                value={idType}
              >
                <option hidden value="-1">
                  ID Type
                </option>
                <option value="aadhar">Aadhar</option>
                <option value="pan">Pan</option>
              </Form.Select>
              <Form.Control
                type="text"
                placeholder="Enter Govt ID"
                onChange={(e) => setGovtID(e.target.value)}
                value={govtID}
              />
            </Stack>
          </Col>
        </Form.Group>
      </Stack>
      <h5 className="text-decoration-underline">Contact Details</h5>
      <Stack
        direction="horizontal"
        className="flex-wrap justify-content-start align-items-center"
        gap={3}
      >
        <Form.Group
          as={Row}
          className="mb-3 align-items-center"
          controlId="formPlaintextEmail"
        >
          <Form.Label column sm="2">
            Guardian Details
          </Form.Label>
          <Col sm="10">
            <Stack direction="horizontal" gap={3}>
              <Form.Select aria-label="Default select example">
                <option hidden value="-1">
                  Enter label
                </option>
                <option value="1">Mr</option>
                <option value="2">Mrs</option>
                <option value="3">Miss</option>
              </Form.Select>
              <Form.Control
                value={guardian}
                onChange={(e) => setGuardian(e.target.value)}
                type="text"
                placeholder="Enter Guardian Name"
              />
            </Stack>
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3 align-items-center"
          controlId="formPlaintextEmail"
        >
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Email"
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3 align-items-center"
          controlId="formPlaintextEmail"
        >
          <Form.Label column sm="3">
            Emergency Contact <br /> Number
          </Form.Label>
          <Col sm="9">
            <Form.Control
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              type="number"
              placeholder="Enter Emergency No"
            />
          </Col>
        </Form.Group>
      </Stack>
      <h5 className="text-decoration-underline">Address Details</h5>
      <Stack
        direction="horizontal"
        className="flex-wrap justify-content-start align-items-center"
        gap={3}
      >
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="3">
            Address
          </Form.Label>
          <Col sm="9">
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Enter Address"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="3">
            State
          </Form.Label>
          <Col sm="9">
            <Form.Select
              value={state}
              onChange={(e) => setState(e.target.value)}
              aria-label="Default select example"
            >
              <option hidden value="-1">
                Enter State
              </option>
              <option value="1">TN</option>
              <option value="2">Andra</option>
              <option value="3">Karnataka</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="3">
            City
          </Form.Label>
          <Col sm="9">
            <Form.Select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              aria-label="Default select example"
            >
              <option hidden value="-1">
                Enter City
              </option>
              <option value="1">Chennai</option>
              <option value="2">Salem</option>
              <option value="3">Namakkal</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="3">
            Country
          </Form.Label>
          <Col sm="9">
            <Form.Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              aria-label="Default select example"
            >
              <option hidden value="-1">
                Enter Country
              </option>
              <option value="1">India</option>
              <option value="2">USA</option>
              <option value="3">China</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="3">
            Pincode
          </Form.Label>
          <Col sm="9">
            <Form.Control
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              type="text"
              placeholder="Enter Pincode"
            />
          </Col>
        </Form.Group>
      </Stack>
      <h5 className="text-decoration-underline">Other Details</h5>
      <Stack
        direction="horizontal"
        className="flex-wrap justify-content-start align-items-center"
        gap={3}
      >
        <Form.Group
          as={Row}
          className="mb-3 align-items-center"
          controlId="formPlaintextEmail"
        >
          <Form.Label column sm="3">
            Occupation
          </Form.Label>
          <Col sm="9">
            <Form.Control
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              type="text"
              placeholder="Enter Occupation"
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3 align-items-center"
          controlId="formPlaintextEmail"
        >
          <Form.Label column sm="3">
            Religion
          </Form.Label>
          <Col sm="9">
            <Form.Select
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
              aria-label="Default select example"
            >
              <option hidden value="-1">
                Enter Religion
              </option>
              <option value="1">Hindu</option>
              <option value="2">Christian</option>
              <option value="3">others</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3 align-items-center"
          controlId="formPlaintextEmail"
        >
          <Form.Label column sm="3">
            Marital Status
          </Form.Label>
          <Col sm="9">
            <Form.Select
              value={Marital_Status}
              onChange={(e) => setMarital_Status(e.target.value)}
              aria-label="Default select example"
            >
              <option hidden value="-1">
                Enter Marital Status
              </option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3 align-items-center"
          controlId="formPlaintextEmail"
        >
          <Form.Label column sm="3">
            Blood Group
          </Form.Label>
          <Col sm="9">
            <Form.Select
              value={Blood_Group}
              onChange={(e) => setBlood_Group(e.target.value)}
              aria-label="Default select example"
            >
              <option hidden value="-1">
                Enter Group
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3 align-items-center"
          controlId="formPlaintextEmail"
        >
          <Form.Label column sm="4">
            Nationality
          </Form.Label>
          <Col sm="8">
            <Form.Select
              value={Nationality}
              onChange={(e) => setNationality(e.target.value)}
              aria-label="Default select example"
            >
              <option hidden value="-1">
                Enter Nationality
              </option>
              <option value="India">India</option>
              <option value="America">America</option>
              <option value="China">China</option>
            </Form.Select>
          </Col>
        </Form.Group>
      </Stack>
      <Stack
        direction="horizontal"
        className="justify-content-end mb-3"
        gap={3}
      >
        <Button className="px-4" variant="outline-danger" type="submit">
          Cancel
          <br />
          (ESC)
        </Button>
        <Button className="px-4 me-5" variant="success" type="submit">
          Submit
          <br />
          (ZZZ)
        </Button>
      </Stack>
      <Backdrop sx={{ color: "#fff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Form>
  );
}
