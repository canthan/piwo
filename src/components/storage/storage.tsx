import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';

import { ItemComponent } from './item/storage.item';
import { EmptyItemComponent } from './empty_item/storage.item.empty';
import { StorageSummaryComponent } from './summary/storage.summary';
import { CommonStorageService } from './common.service';
// import { StorageHttpService } from './storage.http.service';
import { Batch, StorageState } from './storage.types';

import './storage.scss';
import { getBatchesDataAsync, deleteBatchAsync } from '../../actions/storage.actions';
import { OverallAppState } from '../../reducers/initialState';
import { AsyncAction } from '../../types/app.types';

interface MappedProps {
  user_id: number;
  batches: Batch[];
}

interface MappedActions {
  getBatchesDataAsync(user_id: number): AsyncAction;
  deleteBatchAsync(user_id: number, batch_id: number): AsyncAction;
}

type Props = MappedActions & MappedProps;

// export class StorageComponent extends React.Component<Props, StorageState> {
// export class StorageComponent extends React.Component<MappedProps> {
export class StorageComponent extends React.Component<Props> {
  constructor(props) {
    super(props)
    console.log(this.props)
    this.getBatchesData(this.props.user_id);
  }
  // public storageData;
  // public commonService: CommonStorageService = new CommonStorageService();
  // public httpService: StorageHttpService = new StorageHttpService();
  // constructor(props) {
  //   super(props);
  // }

  getBatchesData = (user_id: number): AsyncAction => this.props.getBatchesDataAsync(user_id);
  deleteBatch = (batch_id: number): AsyncAction =>
    this.props.deleteBatchAsync(this.props.user_id, batch_id);

  componentWillMount() {
    console.log(this.props);
    console.log(this.state);
    this.getBatchesData(this.props.user_id);
  }

  // componentDidMount(): void {
  // const userId = prompt('Select user id (temporary solution)');
  // this.getBatchesData(this.props.user_id);
  // }

  // componentWillReceiveProps(newProps) {
  // console.log('componentWillReceiveProps', newProps);
  //   this.httpService.getStorageData(newProps.user_id)
  //   .then((response) => {
  //     this.storageData = response.data.data;
  //     console.log(this.storageData);
  //     this.storageData.batches = this.commonService.formatDateForDisplay(this.storageData.batches);
  //     this.commonService.calculateQuantities(this.storageData.batches);
  //     this.setState({ batches: this.storageData.batches });
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // }

  getSummary(storageData) {}

  renderStorageSummary() {
    return <StorageSummaryComponent />;
  }

  renderItem(item, index) {
    return (
      // <ItemComponent item={item} key={index} deleteBatch={this.deleteBatch} user_id={this.props.user_id} />
      <ItemComponent
        item={item}
        key={index}
        deleteBatch={this.deleteBatch}
        user_id={this.props.user_id}
      />
    );
  }

  renderEmptyItem() {
    return (
      <EmptyItemComponent
        afterBatchWasAdded={this.afterBatchWasAdded}
        user_id={this.props.user_id}
      />
    );
  }

  afterBatchWasAdded = newBatch => {
    // const newState = this.state;
    // newState.batches.push(newBatch);
    // this.setState(newState);
  };

  // deleteBatch = (deletedBatchId) => {
  //   console.log(deletedBatchId)
  //   console.log(this.props)
  //   this.props.deleteBatch(deletedBatchId);
  // }

  // afterBatchWasDeleted = (deletedBatchId) => {
  //   const newState = JSON.parse(JSON.stringify(this.state));
  //   const deletedBatchIndex = this.getDeletedBatchIndex(newState.batches, deletedBatchId);
  //   newState.batches.splice(deletedBatchIndex, 1);
  //   this.setState(newState);
  // }

  // getDeletedBatchIndex = (batches, deletedBatchId) => {
  //   let deletedBatchIndex;
  //   batches.forEach((batch, index) => {
  //     if (batch.batch_id === deletedBatchId) { deletedBatchIndex = index; }
  //   });
  //   return deletedBatchIndex;
  // }

  render() {
    return (
      <div>
        {this.renderStorageSummary()}

        <div className="storage">
          <div className="container">
            <div className="row">
              {this.props.batches.map((item, index) => {
                return this.renderItem(item, index);
              })}
              {this.renderEmptyItem()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class Input extends React.Component<{}, {}> {}

export class Label extends React.Component<{}, {}> {}

export class Text extends React.Component<{}, {}> {}

const mapStateToProps = (state: OverallAppState) => ({
  batches: state.storage.batches
});

export default connect(mapStateToProps, { getBatchesDataAsync, deleteBatchAsync })(StorageComponent);
// export default connect(mapStateToProps, { deleteBatchAsync })(StorageComponent);
// export default connect(null, { deleteBatchAsync })(StorageComponent);

// const dishes = [
//   {
//     name: 'Fasdfasdf',
//     value: 1
//   },
//   {
//     name: 'Adfgdsf',
//     value: 2
//   },
//   {
//     name: 'aasdfas',
//     value: 3
//   },
//   {
//     name: 'basdfasd',
//     value: 4
//   }
// ];

// const orders = [
//   {
//     a: 1,
//     dishes: [
//       {
//         name: 'Fasdfasdf',
//         value: 1
//       },
//       {
//         name: 'Adfgdsf',
//         value: 2
//       },
//       {
//         name: 'aasdfas',
//         value: 3
//       },
//       {
//         name: 'basdfasd',
//         value: 4
//       }
//     ]
//   },
//   {
//     a: 2,
//     dishes: [
//       {
//         name: 'Fasdfasdf',
//         value: 5
//       },
//       {
//         name: 'Adfgdsf',
//         value: 6
//       },
//       {
//         name: 'aasdfas',
//         value: 7
//       },
//       {
//         name: 'basdfasd',
//         value: 8
//       }
//     ]
//   },
//   {
//     a: 3,
//     dishes: [
//       {
//         name: 'gasdfasdf',
//         value: 9
//       },
//       {
//         name: 'Ddfgdsf',
//         value: 10
//       },
//     ]
//   },
// ]
// const reduction = (a,b) => {
//   console.log(a)
//   console.log(b)
//   return [...a, ...b]
// }

// .map(order => order.dishes)
// .reduce(reduction, [])
// .reduce((a,b) => [...a, ...b], [])

