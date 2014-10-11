require! {
  'react': React
  "react-router": Router

  "../api/auth.ls"
}

Dom = React.DOM
{div, h2} = Dom

RootRedirect = React.create-class do
  component-did-mount: ->
    if auth.is-logged-in!
      Router.transition-to 'dashboard'
    else
      Router.transition-to 'login'
  render: ->
    div null

module.exports = RootRedirect
