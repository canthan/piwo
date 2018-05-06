import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StorageSummary, StorageSummaryProps } from './storage.summary.types';
import StorageSummaryHeaderComponent from './storage.summary.header';
import { CalculateSummaryService } from '../calculate.summary.service';
import { Batch } from '../storage.types';
import StorageSummaryLineComponent from './storage.summary.line';

// export class StorageSummary extends React.Component<StorageSummary, StorageSummaryProps> {
export class StorageSummaryComponent extends React.Component<{ batches: Batch[] }, {}> {
  private calculateService: CalculateSummaryService;
  private summary: StorageSummaryProps[];
  constructor(props) {
    super(props);


    // this.state = {

    // }
  }

  getCratesOverall() {
    return [11, 4]
  }
  componentWillMount() {
    this.calculateService = new CalculateSummaryService(this.props.batches);
    console.log(this.calculateService.summary)
  }
  componentWillReceiveProps(newProps) {
    this.calculateService = new CalculateSummaryService(newProps.batches);
    this.summary = this.calculateService.summary;
    console.log(this.calculateService.summary)
  }

  renderLine = (stash: string, index: number) => {
    console.log(this.calculateService.summary);
    return (
      <StorageSummaryLineComponent
        stashName={this.summary[index].stashName}
        litres_overall={this.summary[index].litres_overall}
        litres_in_05={this.summary[index].litres_in_05}
        bottles_small={this.summary[index].bottles_small}
        bottles_05={this.summary[index].bottles_05}
        quantity_crates={
          {
            overall: this.summary[index].quantity_crates.overall,
            empty: this.summary[index].quantity_crates.empty,
            full: this.summary[index].quantity_crates.full,
          }
        }
        // stashName={this.props.batches[0].stashes[0].stash_name}
        // litres_overall={1}
        // litres_in_05={2}
        // bottles_small={3}
        // bottles_05={4}
        // quantity_crates={
        //   {
        //     overall: 5,
        //     empty: 6,
        //     full: 7,
        //   }
        // }
      />
    )
  };

  render() {
    return (
      <div>
        <StorageSummaryHeaderComponent />
        <div>
          {
            this.calculateService.getStorageNames(this.props.batches).map((stash, index) => {
              return this.renderLine(stash, index);
            })
          }
        </div>
      </div>
    );
  }

}

export default StorageSummaryComponent;