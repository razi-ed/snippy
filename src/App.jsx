import React from "react";
import { hot } from 'react-hot-loader/root';

import './styles.css'
import Snippet from "./components/snippet";
import Code from "./components/code";

class App extends React.Component {

  state = {
    mode: "vscode",
    description: "",
    tabTrigger: "",
    snippet: ""
  };

  _onModeChange = mode => {
    this.setState({mode});
  }

  _onSnippetInputKeydown = ( e ) => {
    if ( e.keyCode === 9 ) {
      this._replaceTabWithSpaces(e);
    }

    if ( e.keyCode === 73 && (e.ctrlKey || e.metaKey)) {
      this._addPlaceHolder(e);
    }

    this._onInputChange(e);
  }

  _onInputChange = ( e ) => {
    const { name, value } = e.target;
    this.setState(
      {
        [name]: value
      }
    );
  }


  _replaceTabWithSpaces = (e) => {
    e.preventDefault();

    const selectionStart = this._textareaRef.current.selectionStart;
    const selectionEnd = this._textareaRef.current.selectionEnd;
    const stringBeforeTab = this._textareaRef.current.value.substr( 0, selectionStart );
    const stringAfterTab = this._textareaRef.current.value.substr( selectionEnd, this._textareaRef.current.textLength );
    const newValue = `${stringBeforeTab}  ${stringAfterTab}`;
    this._textareaRef.current.value = newValue;
    this._textareaRef.current.selectionStart = selectionStart + 2;
    this._textareaRef.current.selectionEnd = selectionStart + 2;
  }

  _addPlaceHolder = (e) => {
    e.preventDefault();

    const selectionStart = this._textareaRef.current.selectionStart;
    const selectionEnd = this._textareaRef.current.selectionEnd;
    const stringBeforePlaceholder = this._textareaRef.current.value.substr( 0, selectionStart );
    const stringAfterPlaceholder = this._textareaRef.current.value.substr( selectionEnd, this._textareaRef.current.textLength );
    const newValue = `${stringBeforePlaceholder}\${1:placeholder}${stringAfterPlaceholder}`;
    this._textareaRef.current.value = newValue;
    this._textareaRef.current.selectionStart = selectionStart + 4;
    this._textareaRef.current.selectionEnd = selectionStart + 11;
  }

  _loadTextareaRef = ( ref ) => {
    this._textareaRef = ref;
  }

  _copyToClipboard = ( text ) => {
    if ( !navigator.clipboard ) {
      const textArea = document.createElement( "textarea" );
      textArea.value = text;
      document.body.appendChild( textArea );
      textArea.focus();
      textArea.select();

      const successful = document.execCommand( 'copy' );
      document.body.removeChild( textArea );
      return successful;
    }
    return navigator.clipboard.writeText( text );
  }

  render() {
    return (
      <div className="container">
        <h3 className="btm-padding" style={ { color: '#7a7a7a' } }>
          Snippet Generator
        </h3>
        <div className="row-flex">
          <div className="section-half">
            <Snippet
              onInputChange={ this._onInputChange }
              onSnippetInputKeydown={ this._onSnippetInputKeydown }
              />
          </div>
          <div className="section-half">
            <Code
              updateMode={ this._onModeChange }
              mode={ this.state.mode }
              description={ this.state.description }
              snippet={ this.state.snippet }
              tabTrigger={ this.state.tabTrigger }
              copyToClipboard={ this._copyToClipboard }
              />
          </div>
        </div>
      </div>
    )
  }
}

export default hot(App);
