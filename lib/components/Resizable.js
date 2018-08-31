import React from 'react';
import * as Rx from 'rxjs';
import * as operators from 'rxjs/operators';

export default class Resizable extends React.PureComponent {
  static defaultProps = {
    default: {
      width: 'unset',
      height: 'unset',
    },
    scale: 1,
  };

  resizeAreaEl;
  resizeSubscription;

  style = {
    position: 'relative',
  };
  resizeAreaStyle = {
    cursor: 'se-resize',
    position: 'absolute',
    top: 'calc(100% - 10px)',
    left: 'calc(100% - 10px)',
    width: 10,
    height: 10,
  };

  constructor(props) {
    super(props);

    this.state = {
      width: this.props.default.width,
      height: this.props.default.height,
    };

    this.resizeAreaEl = React.createRef();
  }

  componentDidMount() {
    const element = this.resizeAreaEl.current;
    const dragEvent = Rx.fromEvent(element, 'mousedown').pipe(
      operators.flatMap(downEvent => {
        downEvent.preventDefault();
        downEvent.stopPropagation();

        const init = {
          width: element.offsetWidth,
          height: element.offsetHeight,
          x: downEvent.clientX,
          y: downEvent.clientY,
          lastWidth: this.state.width * this.props.scale,
          lastHeight: this.state.height * this.props.scale,
        };

        return Rx.fromEvent(document, 'mousemove').pipe(
          operators.map(moveEvent => {
            return {
              width: (moveEvent.clientX - init.x + init.width + init.lastWidth - this.resizeAreaStyle.width) / this.props.scale,
              height: (moveEvent.clientY - init.y + init.height + init.lastHeight - this.resizeAreaStyle.height) / this.props.scale,
            };
          }),
          operators.takeUntil(
            Rx.fromEvent(document, 'mouseup').pipe(
              operators.tap(upEvent => this.props.onResizeStop(upEvent, this.state)),
            ),
          ),
        );
      }),
    );

    this.resizeSubscription = dragEvent.subscribe(size => {
      this.setState({
        ...size,
      });
    });
  }

  componentWillUnmount() {
    this.resizeSubscription.unsubscribe();
  }

  render() {
    const { className, style, ...otherProps } = this.props;

    const dynamicStyle = { ...this.state };

    return (
      <React.Fragment>
        <div
          {...otherProps}
          className={className}
          style={{ ...this.style, ...dynamicStyle, ...style }}
        >
          {this.props.children}
        </div>
        <span style={this.resizeAreaStyle} ref={this.resizeAreaEl} />
      </React.Fragment>
    );
  }
}