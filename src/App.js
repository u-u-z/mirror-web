import React, { Component } from "react";
import { Layout, Row, Col } from "antd";
import axios from "axios";
import MirrorsList from "./components/mirrorsList";
import DownloadForm from "./components/downloadForm";
import ContactCard from "./components/contactCard";
import HelpCard from "./components/helpCard";
import ConfigGenerator from "./components/configGenerator";
import "./App.css";

const { Header, Footer, Content } = Layout;

export default class App extends Component {
  state = {
    mirrorsList: null,
    isoLinks: null,
    config: null
  };

  fetch_mirrors_list = (params = {}) => {
    this.setState({
      fetching_slots: true
    });
    axios({
      url: "/jobs",
      method: "get",
      data: {
        ...params
      }
    }).then(response => {
      const mirrorsList = response.data;
      mirrorsList.sort((a, b) => {
        return a.name < b.name ? -1 : 1;
      });
      this.setState({
        mirrorsList: mirrorsList
      });
    });
  };

  fetch_iso_links = (params = {}) => {
    this.setState({
      fetching_slots: true
    });
    axios({
      url: "/static/isoLinks.json",
      method: "get",
      data: {
        ...params
      }
    }).then(response => {
      const isoLinks = response.data;
      console.log(isoLinks);
      this.setState({
        isoLinks: isoLinks
      });
    });
  };

  fetch_config = (params = {}) => {
    this.setState({
      fetching_slots: true
    });
    axios({
      url: "/static/config.json",
      method: "get",
      data: {
        ...params
      }
    }).then(response => {
      const config = response.data;
      console.log(config);
      this.setState({
        config: config
      });
    });
  };

  componentWillMount() {
    this.fetch_mirrors_list();
    this.fetch_iso_links();
    this.fetch_config();
  }

  render() {
    return (
      <Layout>
        <Header>
          <Col offset={3}>
            <div className="logo"> 哈尔滨工业大学开源镜像站</div>
          </Col>
        </Header>
        <Content
          style={{
            padding: "24px",
            background: "white"
          }}
        >
          <Row type="flex" justify="center" gutter={40}>
            <Col md={12}>
              <MirrorsList mirrorsList={this.state.mirrorsList} />
            </Col>
            <Col md={6}>
              <div className="side-card">
                <DownloadForm isoLinks={this.state.isoLinks} />
              </div>
              <div className="side-card">
                <ConfigGenerator config={this.state.config} />
              </div>
              <div className="side-card">
                <ContactCard />
              </div>
              <div className="side-card">
                <HelpCard />
              </div>
            </Col>
          </Row>
        </Content>
        <Footer
          style={{
            textAlign: "center"
          }}
        >
          <p>哈尔滨工业大学开源镜像站</p>
          <p>
            本站由哈尔滨工业大学网络与信息中心支持创办，由哈尔滨工业大学Linux用户协会运行维护。
          </p>
        </Footer>
      </Layout>
    );
  }
}
