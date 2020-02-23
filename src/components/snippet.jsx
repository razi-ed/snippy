import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Snippet extends Component {
  static propTypes = {
    prop: PropTypes
  }

  componentDidMount() {
    if (!!this.props.loadTextareaRef) {
      this.props.loadTextareaRef( this._textareaRef );
    }
  }

  render() {
    return (
      <div className="column-flex">
        <div className="row-flex section-part content-spacebetween">
          <input
            style={ { marginRight: '0.2rem' } }
            type="text"
            className="fixed-height section-half"
            name="description"
            placeholder="Description"
            onInput={this.props.onInputChange}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            />
          <input
            type="text"
            className="fixed-height section-half"
            name="tabTrigger"
            placeholder="Tab trigger"
            onInput={this.props.onInputChange}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            />
        </div>
        <div className="section-major">
          <textarea
            ref={ r => { this._textareaRef = r } }
            className="section-major fill_container"
            name="snippet"
            placeholder="Your snippet"
            // onChange={this.props.onInput}
            onKeyDown={ this.props.onSnippetInputKeydown }
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            wrap="off"
          />
        </div>
      </div>
    )
  }
}
