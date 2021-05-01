import React, { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Chart from "react-apexcharts";
import Form from "react-bootstrap/Form";
import "./ACStatistics.css";
import "../assets/bootstrap.min.css";
import { Carousel, Collapse } from "react-bootstrap";

import { Calendar, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file

import "react-date-range/dist/theme/default.css"; // theme css file
import DatePicker from "react-datepicker";
import "react-datepicker/dist/";

import { addDays } from "date-fns";

function ACData({ data }) {
  return (
    <Row>
      <Col sm={6}>
        <span>{new Date(data.timestamp).getFullYear() + "년"} </span>
        <span>
          {" " + String(Number(new Date(data.timestamp).getMonth()) + 1) + "월"}{" "}
        </span>
        <span>{" " + new Date(data.timestamp).getDate() + "일"} </span>
        <span>{" " + new Date(data.timestamp).getHours() + ":"} </span>
        <span>{" " + new Date(data.timestamp).getMinutes()} </span>
      </Col>
      <Col sm={3}>
        <span>{data.temp}°C</span>
      </Col>
      <Col sm={3}>
        <span>{data.humid}%</span>
      </Col>
    </Row>
  );
}

// function dateSelect(data) {
//   return (
//     <Form.Control as="select" size="sm" onChange = {}>
//       {data.map((n) => {
//         return <option>{n}</option>;
//       })}
//     </Form.Control>
//   );
// }

const ACStatistics = () => {
  const [acdata, setAcData] = useState([]);

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Temp",
        data: acdata.map((n) => {
          return n.temp;
        }),
      },
      {
        name: "Humid",
        data: acdata.map((n) => {
          return n.humid;
        }),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [String(new Date(1619319296329).toJSON())],
      },
      tooltip: {
        x: {
          format: "yy/MM/dd HH:mm",
        },
      },
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [dRange, setDRange] = useState([
    {
      startDate: new Date(+new Date() - 1000 * 60 * 60 * 24),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleClick = (e) => {
    if (e.target.id === "custom") {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(false);
      setAcData([]);
      fetchACDataApi(e.target.id);
    }
  };

  const onDateChange = (item) => {
    fetchACDataApi();
    setDRange([item.selection]);
    // console.log("start:", new Date(dRange[0].startDate));
    // console.log("end:", new Date(dRange[0].endDate));

    // console.log(new Date(dRange[0].startDate).getTime());
  };

  useEffect(() => {
    fetchACDataApi();
  }, []);

  // updates chart data.
  useEffect(() => {
    setChartData({
      series: [
        {
          name: "Temp",
          data: acdata.map((n) => {
            return n.temp;
          }),
        },
        {
          name: "Humid",
          data: acdata.map((n) => {
            return n.humid;
          }),
        },
      ],
      options: {
        chart: {
          width: "450px",
          height: 250,
          type: "area",
        },
        // dataLabels: {
        //   enabled: false,
        // },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: acdata.map((n) => {
            return n.timestamp + 1000 * 60 * 60 * 9; // 시간 보정하기
          }),
        },
        yaxis: [
          {
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
              color: "#008FFB",
            },
            labels: {
              style: {
                colors: "#008FFB",
              },
            },
            title: {
              text: "Temp",
              style: {
                color: "#008FFB",
              },
            },
            tooltip: {
              enabled: false,
            },
            max: 30,
            min: 0,
          },
          {
            seriesName: "Humid",
            opposite: true,
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
              color: "#00E396",
            },
            labels: {
              style: {
                colors: "#00E396",
              },
            },
            title: {
              text: "Humidity",
              style: {
                color: "#00E396",
              },
            },
            max: 100,
            min: 0,
          },
        ],
        tooltip: {
          x: {
            format: "yy/MM/dd HH:mm",
          },
        },
      },
    });
  }, [acdata]);

  function fetchACDataApi() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: new Date(dRange[0].startDate).getTime(),
        until: new Date(dRange[0].endDate).getTime(),
      }),
    };

    fetch("/api/iot/fetchdata/acstat", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        // // console.log(res);
        // for (let timestamp of Object.keys(res)) {
        //   setAcData((acdata) => [...acdata, res[timestamp]]);
        //   // console.log(timestamp);
        // }
        // console.log(acdata);

        setAcData(
          Object.keys(res).map((v) => {
            return res[v];
          })
        );
        // console.log(
        //   Object.keys(res).map((v) => {
        //     return res[v];
        //   })[2]
        // );
      });
  }
  return (
    <div className="ac_stat">
      <h3>AC Statistics</h3>
      {/* <Container> */}
      <Row style={{}}>
        <Col md={6}>
          <Chart
            options={chartData.options}
            series={chartData.series}
            type={chartData.options.chart.type}
            width="100%"
          />
        </Col>
        <Col md={6} className="ac_table">
          <DateRangePicker
            editableDateInputs={true}
            onChange={onDateChange}
            showSelectionPreview={false}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={dRange}
            direction="vertical"
          />
        </Col>
      </Row>
      <Row className="Index">
        <Col sm={6}>
          <b>Measured Date </b>
        </Col>
        <Col sm={3}>
          <b>Temp</b>
        </Col>
        <Col sm={3}>
          <b>Humidity</b>
        </Col>
      </Row>
      {acdata.map((res) => {
        return <ACData data={res} key={res.timestamp} />;
      })}
      {/* </Container> */}
    </div>
  );
};

export default ACStatistics;
