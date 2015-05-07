// Generated by LiveScript 1.3.1
(function(){
  var React, NewTable, SemanticModal, PageHeader, api, FormMixin, Dom, div, i, strong, a, form, Grid, Modal, Module;
  React = require('react');
  NewTable = require('./NewTable');
  SemanticModal = require('./SemanticModal');
  PageHeader = require('./PageHeader');
  api = require('../api/api');
  FormMixin = require('./FormMixin');
  Dom = React.DOM;
  div = Dom.div, i = Dom.i, strong = Dom.strong, a = Dom.a, form = Dom.form;
  Grid = NewTable.Grid;
  Modal = React.createClass({
    mixins: [FormMixin('data')],
    getInitialState(){
      return {
        data: {}
      };
    },
    handleSubmit(){
      var this$ = this;
      console.log(this.state.data);
      return api[this.props.resource].create(this.state.data).then(function(){
        return this$.props.onRequestHide();
      }).error(function(it){
        return this$.setState({
          errors: it.body
        });
      });
    },
    renderInputs(){
      var this$ = this;
      return this.props.formFields.map(function(item, key){
        switch (item.type) {
        case 'default':
          return this$.inputRow(item.key + "", {
            label: item.label
          });
        case 'number':
          return this$.numInputFor(item.key + "", {
            label: item.label,
            key: key
          });
        default:
          return this$.inputFor(item.key + "", {
            label: item.label,
            key: key
          });
        }
      });
    },
    render(){
      console.warn('WARN: deprecated.');
      return this.transferPropsTo(SemanticModal.SemanticModal({
        title: this.props.title,
        animation: true
      }, div({
        className: "content"
      }, form({
        className: "ui form"
      }, this.renderInputs(), this.actions({
        onSubmit: this.handleSubmit,
        onCancel: this.props.onRequestHide
      })))));
    }
  });
  Module = React.createClass({
    displayName: "Module",
    propTypes: {
      title: React.PropTypes.string,
      resource: React.PropTypes.string.isRequired,
      columns: React.PropTypes.array.isRequired,
      fetchData: React.PropTypes.func.isRequired,
      formFields: React.PropTypes.array.isRequired
    },
    getInitialState(){
      return {
        data: []
      };
    },
    getDefaultProps(){
      return {
        columns: []
      };
    },
    componentWillMount(){
      return this.fetchData();
    },
    componentDidMount(){
      return api.assignmentGroup.events.addListener("change", this.fetchData);
    },
    componentWillUnmount(){
      return api.assignmentGroup.events.removeListener("change", this.fetchData);
    },
    fetchData(){
      var this$ = this;
      return this.props.fetchData().then(function(it){
        return this$.setState({
          data: it
        });
      });
    },
    render(){
      console.warn('WARN: deprecated.');
      return div(null, div({
        className: "main container"
      }, div({
        className: "ui top attached right aligned segment"
      }, SemanticModal.ModalTrigger({
        modal: Modal({
          title: "Create " + this.props.title,
          resource: this.props.resource,
          formFields: this.props.formFields
        })
      }, a({
        className: "ui primary tiny button"
      }, "New"))), Grid({
        className: "bottom attached",
        columns: this.props.columns,
        data: this.state.data
      })));
    }
  });
  module.exports = Module;
}).call(this);
