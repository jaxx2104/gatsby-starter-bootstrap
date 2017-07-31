import React from 'react'

class Profile extends React.Component {
  componentDidMount() {
    if (typeof twttr != 'undefined') {
      twttr.widgets.load(this.refs.twButton)
    }
  }

  render() {
    const pathPrefix =
      process.env.NODE_ENV === 'development' ? '' : __PATH_PREFIX__
    return (
      <div>
        <section className="text-center">
          <div className="container">
            <img
              src={pathPrefix + '/img/profile.jpg'}
              alt="jaxx2104"
              className="rounded-circle mx-auto d-block"
              width="120px"
            />
            <h1>jaxx2104</h1>
            <p className="lead text-muted">I love bug</p>
            <div>
              <a
                ref="twButton"
                href="https://twitter.com/jaxx2104"
                className="twitter-follow-button"
                data-show-count="false"
              >
                Follow @jaxx2104
              </a>
            </div>
          </div>
        </section>

        <section id="features" className="bg-danger text-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="section-heading">SKIL</h2>
                <hr className="primary" />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-lg-3 col-6">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="HTML"
                >
                  <i
                    className="devicon-html5-plain wow bounceIn"
                    data-wow-duration="2.0s"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="JavaScript"
                >
                  <i
                    className="devicon-javascript-plain wow bounceIn"
                    data-wow-duration="2.0s"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="React.js"
                >
                  <i
                    className="devicon-react-original wow bounceIn"
                    data-wow-duration="2.0s"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Vue.js"
                >
                  <i
                    className="devicon-vuejs-plain wow bounceIn"
                    data-wow-duration="2.0s"
                  />
                </div>
              </div>
            </div>
            <div className="row justify-content-md-center">
              <div className="col-lg-3 col-6">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Node.js"
                >
                  <i
                    className="devicon-nodejs-plain-wordmark wow bounceIn"
                    data-wow-duration="2.0s"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-6 ">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="PHP"
                >
                  <i
                    className="devicon-php-plain wow bounceIn"
                    data-wow-duration="2.0s"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-6 ">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Swift"
                >
                  <i
                    className="devicon-swift-plain-wordmark wow bounceIn"
                    data-wow-duration="2.0s"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-6 ">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="AWS"
                >
                  <i
                    className="devicon-amazonwebservices-plain-wordmark"
                    data-wow-duration="2.0s"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="text-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="section-heading">Features </h2>
                <hr className="primary" />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="service-box">
              <p>sample text :D</p>
            </div>
          </div>
        </section>

        <section className="bg-danger text-center" id="concept">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="section-heading">WORKS </h2>
                <hr className="light" />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div
                className="col-md-6 wow slideInLeft"
                data-wow-duration="1.0s"
              >
                <img
                  src={pathPrefix + '/img/work1.png'}
                  alt="work1"
                  className="rounded-circle mx-auto"
                />
                <p>work1</p>
              </div>
              <div
                className="col-md-6 wow slideInRight"
                data-wow-duration="1.0s"
              >
                <img
                  src={pathPrefix + '/img/work2.png'}
                  alt="work2"
                  className="rounded-circle mx-auto"
                />
                <p>work2</p>
              </div>
            </div>
          </div>
        </section>

        <section id="repos">
          <div className="container">
            <div className="row">
              <div className="col-md-6 ">
                <h2 className="section-heading">Repositories</h2>
              </div>
              <div className="col-md-6 text-xs-left">
                <li>
                  <a href="">sample</a>
                </li>
                <li>
                  <a href="">sample</a>
                </li>
                <li>
                  <a href="">sample</a>
                </li>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Profile
