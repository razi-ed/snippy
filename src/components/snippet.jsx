import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Snippet extends PureComponent {
  static propTypes = {
    textareaRef: PropTypes.any.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onSnippetInputKeydown: PropTypes.func.isRequired,
    snippet: PropTypes.string,
    description: PropTypes.string,
    tabTrigger: PropTypes.string,
  }

  static defaultProps = {
    snippet: "",
    description: "",
    tabTrigger: "",
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
            defaultValue={ this.props.description }
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
            defaultValue={ this.props.tabTrigger }
            />
        </div>
        <div className="section-major">
          <textarea
            ref={ this.props.textareaRef }
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
            defaultValue={ this.props.snippet }
          />
        </div>
      </div>
    )
  }
}
