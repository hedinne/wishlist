/* eslint no-undef: "off", max-len: "off" */
import React, { PropTypes, Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import MediaQuery from 'react-responsive';

import Details from '../Details/Details.jsx';
import s from './List.scss';


export default class List extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      createNew: false,
      copyOpen: false,
      copied: false,
    };

    this.createNewItem = this.createNewItem.bind(this);
    this.clipboardFocus = this.clipboardFocus.bind(this);
    this.showCopy = this.showCopy.bind(this);
  }

  showCopy() {
    if (this.state.copyOpen) {
      this.setState({ copyOpen: false, copied: false });
    } else {
      this.setState({ copyOpen: true, copied: false });
    }
  }

  createNewItem() {
    if (!this.props.isNew) {
      this.props.onClickAddNew(this.props.list._id);
    } else {
      this.props.listClosed();
    }
  }

  clipboardFocus(e) { // eslint-disable-line
    e.target.select();
  }


  render() {

    const {
      list,
      onCreateItem,
      onRemoveItem,
      onRemoveList,
      itemSelected,
      listClosed,
      openItem,
      onChangeNewItem,
      isNew,
    } = this.props;

    const open = openItem.owner === list._id;
    const hostClasses = s('host', { isOpen: open });
    const url = (window !== 'undefined') && `${window.location.href}list/${list._id}`;

    return (
      <div className={hostClasses}>
        <div className={s.headingContainer}>
          <button onClick={this.createNewItem} className={s('iconButton', 'titleButton')}>
            <h4 className={s.title}>
              {list.title}
            </h4>
          </button>

          <div className={s.buttonContainer} >
            {open &&
              <button onClick={onRemoveList} id={`remove_${list._id}`} className={s.iconButton} title="Delete List">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#ddd" d="M10 1h4q1.242 0 2.121 0.879t0.879 2.121v1h4q0.414 0 0.707 0.293t0.293 0.707-0.293 0.707-0.707 0.293h-1v12q0 1.242-0.879 2.121t-2.121 0.879h-10q-1.242 0-2.121-0.879t-0.879-2.121v-12h-1q-0.414 0-0.707-0.293t-0.293-0.707 0.293-0.707 0.707-0.293h4v-1q0-1.242 0.879-2.121t2.121-0.879zM18 19v-12h-12v12q0 0.414 0.293 0.707t0.707 0.293h10q0.414 0 0.707-0.293t0.293-0.707zM14 3h-4q-0.414 0-0.707 0.293t-0.293 0.707v1h6v-1q0-0.414-0.293-0.707t-0.707-0.293z" />
                </svg>
              </button>
            }
            <button className={s.iconButton} title="Share list" onClick={this.showCopy}>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="#ddd"
                  d="M18 2q1.656 0 2.828 1.172t1.172 2.828-1.172 2.828-2.828 1.172q-0.883 0-1.668-0.363t-1.348-1.012l-5.070 2.539q0.086 0.414 0.086 0.836t-0.086 0.836l5.070 2.539q0.563-0.648 1.348-1.012t1.668-0.363q1.656 0 2.828 1.172t1.172 2.828-1.172 2.828-2.828 1.172-2.828-1.172-1.172-2.828q0-0.422 0.086-0.836l-5.070-2.539q-0.563 0.648-1.348 1.012t-1.668 0.363q-1.656 0-2.828-1.172t-1.172-2.828 1.172-2.828 2.828-1.172q0.883 0 1.668 0.363t1.348 1.012l5.070-2.539q-0.086-0.414-0.086-0.836 0-1.656 1.172-2.828t2.828-1.172zM6 10q-0.828 0-1.414 0.586t-0.586 1.414 0.586 1.414 1.414 0.586 1.414-0.586 0.586-1.414-0.586-1.414-1.414-0.586zM18 16q-0.828 0-1.414 0.586t-0.586 1.414 0.586 1.414 1.414 0.586 1.414-0.586 0.586-1.414-0.586-1.414-1.414-0.586zM18 4q-0.828 0-1.414 0.586t-0.586 1.414 0.586 1.414 1.414 0.586 1.414-0.586 0.586-1.414-0.586-1.414-1.414-0.586z"
                />
              </svg>
            </button>
            <button onClick={this.createNewItem} title="Add Item" className={s.iconButton}>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className={s.svg} width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="#ddd"
                  d="M12 2q0.414 0 0.707 0.293t0.293 0.707v8h8q0.414 0 0.707 0.293t0.293 0.707-0.293 0.707-0.707 0.293h-8v8q0 0.414-0.293 0.707t-0.707 0.293-0.707-0.293-0.293-0.707v-8h-8q-0.414 0-0.707-0.293t-0.293-0.707 0.293-0.707 0.707-0.293h8v-8q0-0.414 0.293-0.707t0.707-0.293z"
                />
              </svg>
            </button>
            {open &&
              <button onClick={listClosed} title="Minimize" className={s.iconButton}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="#ddd"
                    d="M2 1q0.422 0 0.711 0.289l6.289 6.289v-4.586q0-0.414 0.293-0.707t0.707-0.293 0.707 0.293 0.293 0.707v7q0 0.414-0.297 0.711t-0.711 0.297h-7q-0.414 0-0.707-0.293t-0.293-0.707 0.293-0.707 0.707-0.293h4.586l-6.289-6.289q-0.289-0.289-0.289-0.711 0-0.43 0.285-0.715t0.715-0.285zM14.008 13h7q0.414 0 0.707 0.293t0.293 0.707-0.293 0.707-0.707 0.293h-4.586l6.281 6.289q0.297 0.297 0.297 0.711t-0.293 0.707-0.707 0.293q-0.422 0-0.711-0.289l-6.289-6.289v4.586q0 0.414-0.293 0.707t-0.707 0.293-0.707-0.293-0.293-0.707v-7q0-0.414 0.297-0.711t0.711-0.297z"
                  />
                </svg>
              </button>}
          </div>
        </div>
        <hr className={s.line} />

        {this.state.copyOpen &&
          <div className={s.clipboardContainer}>
            <input type="text" readOnly value={url} onFocus={this.clipboardFocus} className={s.clipboardInput} />

            <CopyToClipboard
              text={url}
              onCopy={() => this.setState({ copied: true })}
            >
              <button title="Copy to Clipboard" className={s.iconButton}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="#ddd"
                    d="M10 1h4q0.969 0 1.742 0.559t1.086 1.441h1.172q1.242 0 2.121 0.879t0.879 2.121v14q0 1.242-0.879 2.121t-2.121 0.879h-12q-1.242 0-2.121-0.879t-0.879-2.121v-14q0-1.242 0.879-2.121t2.121-0.879h1.172q0.312-0.883 1.086-1.441t1.742-0.559zM18 5h-1.172q-0.312 0.883-1.086 1.441t-1.742 0.559h-4q-0.969 0-1.742-0.559t-1.086-1.441h-1.172q-0.414 0-0.707 0.293t-0.293 0.707v14q0 0.414 0.293 0.707t0.707 0.293h12q0.414 0 0.707-0.293t0.293-0.707v-14q0-0.414-0.293-0.707t-0.707-0.293zM14 3h-4q-0.414 0-0.707 0.293t-0.293 0.707 0.293 0.707 0.707 0.293h4q0.414 0 0.707-0.293t0.293-0.707-0.293-0.707-0.707-0.293z"
                  />
                </svg>

              </button>
            </CopyToClipboard>

            {this.state.copied &&
              <button className={s.iconButton}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#ddd" d="M21 5q0.43 0 0.715 0.285t0.285 0.715q0 0.422-0.289 0.711l-12 12q-0.289 0.289-0.711 0.289t-0.711-0.289l-6-6q-0.289-0.289-0.289-0.711 0-0.43 0.285-0.715t0.715-0.285q0.422 0 0.711 0.289l5.289 5.297 11.289-11.297q0.289-0.289 0.711-0.289z" />
                </svg>
              </button>
            }
          </div>
        }

        <div className={s.container}>
          <ul className={s.ul}>
            <MediaQuery query="(max-width: 768px)">
              {openItem && isNew && (
                <Details
                  onChangeNewItem={onChangeNewItem}
                  onCreateItem={onCreateItem}
                  listID={list._id}
                />
              )}
            </MediaQuery>
            {list.listItems &&
              list.listItems.map(item => (
                <li key={item._id} className={s.li}>
                  <button onClick={itemSelected.bind(this, item)} className={s.item}>
                    {item.title}
                  </button>
                  <MediaQuery query="(max-width: 768px)">
                    {(openItem.owner === list._id && !isNew && item._id === openItem._id) && (
                      <Details
                        openItem={openItem}
                        onRemoveItem={onRemoveItem}
                      />
                    )}
                  </MediaQuery>
                </li>
              ))
            }
          </ul>

          <MediaQuery query="(min-width: 768px)" className={s({ side: openItem })}>
            <div className={s.side}>
              {(openItem.owner === list._id && !isNew) && (
                <Details
                  openItem={openItem}
                  onRemoveItem={onRemoveItem}
                />
              )}

              {openItem && isNew && (
                <Details
                  onChangeNewItem={onChangeNewItem}
                  onCreateItem={onCreateItem}
                  listID={list._id}
                />
              )}
            </div>
          </MediaQuery>
        </div>
      </div>
    );
  }
}


List.propTypes = {
  list: PropTypes.any,
  onCreateItem: PropTypes.func,
  onRemoveItem: PropTypes.func,
  onRemoveList: PropTypes.func,
  itemSelected: PropTypes.func,
  listClosed: PropTypes.func,
  onChangeNewItem: PropTypes.func,
  openItem: PropTypes.any,
  onClickAddNew: PropTypes.func,
  isNew: PropTypes.bool,
};
