import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { html } from "common-tags";

export default class Code extends Component {
  static propTypes = {
    prop: PropTypes
  }

  _getCode = ( mode, snippet, tabtrigger, description ) => {
    
    switch (mode) {
      case "atom":
        return html`
          '${description}':
            'prefix': '${tabtrigger}'
            'body': """
              ${snippet}
            """
        `;

      case "sublimetext":
          const regEx = /(\$)([a-z(]+)([^$])/gi;
          const cleanedSnippet = snippet.replace(regEx, "\\$1$2$3");
          // prettier-ignore
          return html`
            <snippet>
              <content><![CDATA[
            ${cleanedSnippet}
            ]]></content>
              <tabTrigger>${tabtrigger}</tabTrigger>
              <description>${description}</description>
              <!-- Optional: Set a scope to limit where the snippet will trigger -->
              <!-- <scope >source.python</scope > -->
            </snippet>
          `;


      case "vscode":
        const separatedSnippet = snippet
          .replace(/\\/g, "\\\\")
          .replace(/"/g, '\\"')
          .split("\n");
        const separatedSnippetLength = separatedSnippet.length;

        // add double quotes around each line apart from the last one
        const newSnippet = separatedSnippet.map((line, index) => {
          return index === separatedSnippetLength - 1 ? `"${line}"` : `"${line}",`;
        });
        // prettier-ignore
        return html`
          "${description}": {
            "prefix": "${tabtrigger}",
            "body": [
              ${newSnippet.join('\n')}
            ],
            "description": "${description}"
          }
        `;
      default:
        return ""
    }
  }

  render() {
    return (
      <div className="column-flex">
        <div className="row-flex"
          >
          <button
            className={ `fixed-height fixed-width ${ this.props.mode === "vscode" ? "" : "" }` }
            onClick={() => this.props.updateMode("vscode")}
          >
            VSCode
          </button>
          <button
            className={ `fixed-height fixed-width ${ this.props.mode === "sublimetext" ? "" : "" }` }
            onClick={() => this.props.updateMode("sublimetext")}
          >
            Sublime Text
          </button>
          <button
            className={ `fixed-height fixed-width ${ this.props.mode === "atom" ? "" : "" }` }
            onClick={() => this.props.updateMode("atom")}
          >
            Atom
          </button>
        </div>
        <div>
          <pre className="code-container fill_container">
            { this._getCode( this.props.mode, this.props.snippet, this.props.tabTrigger, this.props.description ) }
          </pre>
        </div>
      </div>
    )
  }
}
