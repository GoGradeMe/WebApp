require! {
  React
  '../api/api.ls'
}

Dom = React.DOM
{div, h2} = Dom

SignedOut = React.create-class do
  statics:
    willTransitionTo: (transition, params) ->
      if api.auth.token
        transition.redirect('/dashboard')

  render: ->
    div null,
      @props.activeRoute

module.exports = SignedOut