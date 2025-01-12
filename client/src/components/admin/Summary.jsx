import styled from "styled-components";
import { FaUsers, FaChartBar, FaClipboard } from "react-icons/fa";
import Widget from "./summaryComponents/Widget";
import { useEffect, useState } from "react";
import axios from "axios";
import Transactions from "./summaryComponents/Transactions";
import AllTimeData from "./summaryComponents/AllTimeData";
import PieCharts from "./summaryComponents/PieChart";

const Summary = () => {
  const [users, setUsers] = useState(15);
  const [usersPerc, setUserPerc] = useState(0);
  const [orders, setoOders] = useState();
  const [ordersPerc, setOrdersPerc] = useState(0);
  const [total, setTotal] = useState();
  const [totalPerc, setTotalPerc] = useState(0);

  function compare(a, b) {
    if (a._id < b._id) return 1;
    if (a._id > b._id) return -1;
    else return 0;
  }

  async function fetchOrders() {
    try {
      const res = await axios.get(
        `https://healthy-market-app-production.up.railway.app/order`
      );
      res.data.sort(compare);
      setoOders(res.data);
      setOrdersPerc(
        ((res.data[0].total - res.data[1].total) / res.data[1].total) * 10
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchUsers() {
    try {
      setUsers(17);
      setUserPerc(35);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchTotal() {
    try {
      const res = await axios.get(
        `https://healthy-market-app-production.up.railway.app/order/income`
      );
      res.data.sort(compare);
      setTotal(res.data);
      setTotalPerc(
        ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
      );
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchTotal();
  }, []);

  const data = [
    {
      icon: <FaUsers />,
      digits: users && users,
      isMoney: false,
      title: "Usuarios",
      color: "rgb(102, 108, 255)",
      bgColor: "rgba(102, 108, 255, 0.12)",
      percentage: usersPerc,
    },
    {
      icon: <FaClipboard />,
      digits: orders && orders[0]?.total,
      isMoney: false,
      title: "Ordenes",
      color: "rgb(38, 198, 249)",
      bgColor: "rgba(38, 198, 249, 0.12)",
      percentage: 110,
    },
    {
      icon: <FaChartBar />,
      digits: total && total[0]?.total,
      isMoney: true,
      title: "Ganancias",
      color: "rgb(253, 181, 40)",
      bgColor: "rgba(253, 181, 40, 0.12)",
      percentage: 115,
    },
  ];

  return (
    <div className="flex">
      <MainStats>
        <Overview>
          <Title>
            <h2>Overview</h2>
            <p>Estadísticas del último mes</p>
          </Title>
          <WidgetWrapper>
            {data.map((data, index) => (
              <Widget key={index} data={data} />
            ))}
          </WidgetWrapper>
        </Overview>
        <PieCharts />
      </MainStats>
      <SideStats>
        <AllTimeData />
        <Transactions />
      </SideStats>
    </div>
  );
};

export default Summary;

const StyledSummary = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const MainStats = styled.div`
  flex: 2;
  width: 100%;
`;

const Title = styled.div`
  p {
    font-size: 14px;
    color: rgba(234, 234, 255, 0.68);
  }
`;

const Overview = styled.div`
  display: flex;
  width: 100%;
  height: 170px;
  padding: 1.5rem;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  color: rgba(234, 234, 255, 0.87);
  background: rgb(48, 51, 78);
`;

const WidgetWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SideStats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width: 100%;
`;
