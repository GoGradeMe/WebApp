// Generated by LiveScript 1.3.1
(function(){
  var React, moment, Panel, NewTable, api, CreateClassModal, Link, SemanticModal, Header, Select, Dom, div, i, strong, a, Grid, ClassName, ClassList;
  React = require('react');
  moment = require('moment');
  Panel = require('../../components/Panel.ls');
  NewTable = require('../../components/NewTable.ls');
  api = require('../../api/api.ls');
  CreateClassModal = require('./CreateClassModal.ls');
  Link = require('react-router').Link;
  SemanticModal = require('../../components/SemanticModal.ls');
  Header = require('../../components/PageHeader');
  Select = require('react-select');
  Dom = React.DOM;
  div = Dom.div, i = Dom.i, strong = Dom.strong, a = Dom.a;
  Grid = NewTable.Grid;
  ClassName = React.createClass({
    render: function(){
      var termId;
      termId = this.props.column.term || "";
      return div(null, Link({
        to: "class.grades",
        params: {
          termId: termId,
          resourceId: this.props.row.id
        }
      }, this.props.value));
    }
  });
  ClassList = React.createClass({
    displayName: "ClassList",
    getInitialState: function(){
      return {
        classes: [],
        terms: null,
        term: null
      };
    },
    componentWillMount: function(){
      var this$ = this;
      api['class'].find().then(function(it){
        return this$.setState({
          classes: it
        });
      });
      return api.term.find().then(function(it){
        this$.setState({
          term: it[0].id
        });
        return this$.setState({
          terms: it
        });
      });
    },
    cols: function(){
      return [
        {
          key: 'name',
          display: 'Class Name',
          renderer: ClassName,
          term: this.state.term
        }, {
          key: 'gradeLevel',
          display: 'Grade Level'
        }, {
          display: '',
          resourceType: "class",
          renderer: NewTable.CrudActions,
          linkTo: "class",
          className: "right aligned",
          tdClassName: "right aligned"
        }
      ];
    },
    updateSelect: function(it){
      console.log(it);
      return this.setState({
        term: it
      });
    },
    selectRender: function(xs){
      switch (false) {
      case !!xs:
        return "Loading...";
      default:
        return Select({
          className: "inline",
          onChange: this.updateSelect,
          value: this.state.term,
          autoload: false,
          options: xs.map(function(x){
            return {
              label: "Year " + (x != null ? x.schoolYear.start : void 8) + "-" + (x != null ? x.schoolYear.end : void 8) + " - " + (x != null ? x.name : void 8),
              value: x != null ? x.id : void 8
            };
          })
        });
      }
    },
    rightButtons: function(){
      return this.selectRender(this.state.terms);
    },
    render: function(){
      return div(null, Header({
        primary: 'All Classes',
        right: this.rightButtons()
      }), div({
        className: "main container"
      }, div({
        className: "ui top attached right aligned segment"
      }, SemanticModal.ModalTrigger({
        modal: CreateClassModal()
      }, a({
        className: "ui primary tiny button"
      }, "New Class"))), Grid({
        className: "bottom attached",
        columns: this.cols(),
        data: this.state.classes
      })));
    }
  });
  module.exports = ClassList;
}).call(this);