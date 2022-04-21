import React from "react";
import "./Footer.css";
import facebook from "../../assets/facebook.png";
import insta from "../../assets/insta.png";
import twitter from "../../assets/twitter.png";
import { height } from "@mui/system";

function Footer() {
  return (
    <div style={{ width: "100%" }}>
      <footer
        class="text-white text-center text-lg-start"
        style={{ backgroundColor: "#23242a", width: "100%," }}
      >
        <div class="container p-4">
          <div class="row mt-4">
            <div class="col-lg-4 col-md-12 mb-4 mb-md-0">
              <h5 class="text-uppercase mb-4">About company</h5>

              <p>
                Teams around the world invent on behalf of our customers every
                day to meet their desire for lower prices, better selection, and
                convenient services.
              </p>

              {/* <p>
              Blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas
              molestias.
            </p> */}

              <div class="mt-4">
                <a href="https://www.facebook.com/hashedin">
                  <img
                    className="facebook-logo"
                    src={facebook}
                    alt=""
                    style={{ marginLeft: "35px" }}
                  />
                </a>

                <a href="https://twitter.com/HashedIn">
                  <img
                    className="twitter-logo"
                    src={twitter}
                    alt=""
                    style={{ marginLeft: "25px" }}
                  />
                </a>

                <a href="https://www.instagram.com/hashedintechnologies/">
                  <img
                    className="insta-logo"
                    src={insta}
                    alt=""
                    style={{ marginLeft: "25px" }}
                  />
                </a>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 class="text-uppercase mb-4 pb-1">Search something</h5>

              <div class="form-outline form-white mb-4">
                <input
                  type="text"
                  id="formControlLg"
                  class="form-control form-control-lg"
                ></input>
                <label
                  class="form-label"
                  for="formControlLg"
                  style={{ marginLeft: "0px" }}
                >
                  Search
                </label>
                <div class="form-notch">
                  <div
                    class="form-notch-leading"
                    style={{ width: "9px" }}
                  ></div>
                  <div
                    class="form-notch-middle"
                    style={{ width: "48.8px" }}
                  ></div>
                  <div class="form-notch-trailing"></div>
                </div>
              </div>

              <ul class="fa-ul" style={{ marginLeft: "1.65em" }}>
                {/* <li class="mb-3">
                <span class="fa-li"><i class="fas fa-home"></i></span><span class="ms-2">New York, NY 10012, US</span>
              </li> */}
                <li class="mb-3">
                  <span class="fa-li">
                    <i class="fas fa-envelope"></i>
                  </span>
                  <span class="ms-2">
                    <a
                      style={{
                        fontSize: "large",
                        textDecoration: "none",
                        color: "white",
                      }}
                      href={"https://en.wiktionary.org/wiki/imbarco"}
                    >
                      Imbarco.com
                    </a>
                  </span>
                </li>
                {/* <li class="mb-3">
                <span class="fa-li"><i class="fas fa-phone"></i></span><span class="ms-2">+ 01 234 567 88</span>
              </li>
              <li class="mb-3">
                <span class="fa-li"><i class="fas fa-print"></i></span><span class="ms-2">+ 01 234 567 89</span>
              </li> */}
              </ul>
            </div>

            <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 class="text-uppercase mb-4">Opening hours</h5>

              <table class="table text-center text-white">
                <tbody class="font-weight-normal">
                  <tr>
                    <td>Mon - Thu:</td>
                    <td>8am - 9pm</td>
                  </tr>
                  <tr>
                    <td>Fri - Sat:</td>
                    <td>8am - 1am</td>
                  </tr>
                  <tr>
                    <td>Sunday:</td>
                    <td>9am - 10pm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          class="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2020 Copyright:
          <a class="text-white" href="https://mdbootstrap.com/">
            Imbarco.com
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
