var React = require('react');
var api = require('../../api/api.ls');
var CrudTable = require('../../components/CrudTable.ls');
var NewTable = require('../../components/NewTable.ls');

var Terms = React.createClass({
    tableColumns: [{
        key: "schoolYear",
        display: "School Year"
    }, {
        key: "name",
        display: "Name"
    }, {
        key: "startDate",
        display: "Start Date",
        format: 'date'
    }, {
        key: "endDate",
        display: "End Date",
        format: 'date'
    }, {
        display: '',
        resourceType: "term",
        renderer: NewTable.CrudActions,
        linkTo: "term",
        className: "right aligned",
        tdClassName: "right aligned"
    }],
    fields: [{
        key: "schoolYear",
        label: "School Year"
    }, {
        key: "name",
        label: "Name"
    }, {
        key: "startDate",
        label: "Start Date"
    }, {
        key: "endDate",
        label: "End Date"
    }],
    fetch() {
        return api.term.find();
    },
    render() {
        return (
            <div>
                <CrudTable columns={this.tableColumns} fetchData={this.fetch} resource="term" title="Term" formFields={this.fields} />
            </div>
        );
    }
});

module.exports = Terms