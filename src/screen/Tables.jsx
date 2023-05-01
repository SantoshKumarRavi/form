import React from "react";
import $ from "jquery";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: [
        "Name",
        "Age",
        "Sex",
        "Mobile",
        "Address",
        " Govt ID",
        "Guardian Details",
        "Nationality",
      ],
    };
    this.fetchForm = this.fetchForm.bind(this);
  }

  componentDidMount() {
    this.fetchForm();
  }

  fetchForm() {
    fetch("https://quizbackend-x9lu.onrender.com/form")
      .then((x) => x.json())
      .then((x) => {
        let structured = [...x];
        structured = structured.map(
          ({
            name,
            age,
            sex,
            mobileNumber,
            address,
            aadhar,
            guardian,
            Nationality,
          }) => {
            return [
              name || "---",
              age || "---",
              sex || "---",
              mobileNumber || "---",
              address || "---",
              aadhar || "---",
              guardian || "---",
              Nationality || "---",
            ];
          }
        );
        this.setState({
          dataSet: structured,
        });
        $("#example").DataTable();
      }).then(()=>{
        $('#example').DataTable().destroy();
        $(document).ready(function () {
          $("#example").DataTable();
        });
      })
  }
  render() {
    return (
      <div className="MainDiv mt-4">
        <div className="container">
          <table
            id="example"
            className="display"
            style={{
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                {this.state.heading?.map((x, i) => (
                  <th
                    key={i}
                    style={{
                      backgroundColor: "#90EE90",
                      border: "1px solid black",
                    }}
                  >
                    {x}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {this?.state?.dataSet?.map((userArr, i) => (
                <tr key={i}>
                  {userArr?.map((x, j) => (
                    <td key={j}>{x}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Table;
