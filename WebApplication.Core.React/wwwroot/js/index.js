﻿"use strict";

var Index = React.createClass({
   displayName: "Index",

   getInitialState: function getInitialState() {
      var _this = this;

      // Connect this component to the back-end view model.
      this.vm = dotnetify.react.connect("IndexVM", function () {
         return _this.state;
      }, function (state) {
         return _this.setState(state);
      });
      return Object.assign(window.vmStates.IndexVM || {}, {
         selectedLink: ""
      });
   },
   render: function render() {
      var _this2 = this;

      var styles = {
         navMenu: { padding: "15px", color: "rgb(125,135,140)", backgroundColor: "rgb(40,50,55)" },
         link: { color: "#b8c7ce" },
         exampleLink: { color: "#b8c7ce", display: "block", padding: "5px 0px 5px 20px", textDecoration: "none" },
         activeExampleLink: { color: "black", backgroundColor: "#eef0f0", display: "block", padding: "5px 0px 5px 20px", textDecoration: "none" },
         desc: { padding: "0 15px 0 35px", fontSize: "9pt", marginBottom: ".5em" },
         header: { fontSize: "medium", color: "rgba(146,208,80,.8)" },
         list: { paddingLeft: "0", listStyleType: "none", margin: "0 -15px" },
         listItem: { paddingLeft: "20px" },
         bullet: { color: "rgba(255,205,0,.8)", transform: "scale(.5)" },
         copyright: { color: "rgb(125,135,140)", fontSize: "8pt" }
      };

      var handleRoute = function handleRoute(event, linkId) {
         _this2.setState({ selectedLink: linkId });
         _this2.vm.$handleRoute(event);
      };

      var showLinks = function showLinks(links) {
         return links.map(function (link) {
            return React.createElement(
               "li",
               { key: link.Id },
               React.createElement(
                  "a",
                  { style: link.Id == _this2.state.selectedLink ? styles.activeExampleLink : styles.exampleLink, className: "example-link",
                     href: _this2.vm.$route(link.Route),
                     onClick: function (event) {
                        return handleRoute(event, link.Id);
                     } },
                  React.createElement("span", { style: styles.bullet, className: "glyphicon glyphicon-asterisk" }),
                  link.Caption
               ),
               React.createElement(
                  "div",
                  { style: styles.desc },
                  link.Description
               )
            );
         });
      };

      return React.createElement(
         "div",
         { style: styles.navMenu },
         React.createElement(
            "a",
            { style: styles.link, href: "http://dotnetify.net" },
            "Website"
         ),
         React.createElement(
            "div",
            null,
            React.createElement(
               "h3",
               { style: styles.header },
               "Basic Examples"
            ),
            React.createElement(
               "ul",
               { id: "BasicExamples", style: styles.list },
               showLinks(this.state.BasicExampleLinks)
            ),
            React.createElement(
               "h3",
               { style: styles.header },
               "Further Examples"
            ),
            React.createElement(
               "ul",
               { id: "FurtherExamples", style: styles.list },
               showLinks(this.state.FurtherExampleLinks)
            )
         ),
         React.createElement(
            "div",
            { style: styles.copyright },
            React.createElement("br", null),
            React.createElement(
               "small",
               null,
               "© 2015-2017 Dicky Suryadi.  All code licensed under the ",
               React.createElement(
                  "a",
                  { style: styles.link, href: "http://www.apache.org/licenses/LICENSE-2.0" },
                  "Apache license version 2.0"
               )
            ),
            React.createElement("br", null),
            React.createElement("br", null)
         )
      );
   }
});

ReactDOM.render(React.createElement(Index, null), document.querySelector("#NavMenu"));

