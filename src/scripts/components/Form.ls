require! {
  React: 'react'
}
Dom = React.DOM
{div, label, input, form, button} = Dom

Input = React.create-class do
  prop-types:
    type: React.PropTypes.string.isRequired

  get-default-props: ->
    label: ""
    placeholder: ""

  call-change: (e)->
    @props.on-change e.target.value

  get-inputDOM-Node: ->
    @refs.input.getDOM-Node!

  render: ->
    placeholder = @props.placeholder || @props.label
    div class-name: "#{@props.class-name} field",
      label null, @props.label if @props.label
      input do
        ref: "input"
        placeholder: placeholder
        type: @props.type
        on-change: @call-change
        value: @props.value
        on-blur: @props.on-blur

Form = React.create-class do
  display-name: "Form"
  prop-types:
    on-submit: React.PropTypes.func.isRequired

  get-default-props: ->
    submit-button: "Submit"

  handle-submit: (e) ->
    e.prevent-default!

  render: ->
    div null,
      form class-name: "ui form" on-submit: @handle-submit,
        @props.children
      div null,
        button class-name: "ui button" type: "submit",
          @props.submit-button

module.exports =
  Form: Form
  Input: Input
