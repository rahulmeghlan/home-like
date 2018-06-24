import React from 'react';
import EditRepoDetailFormView from './EditRepoDetailFormView';

export default class EditRepoDetailView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showEditForm: false};

        this.toggleEditForm = this.toggleEditForm.bind(this);
    }

    toggleEditForm() {
        this.setState(prevState => ({
            showEditForm: !prevState.showEditForm
        }));
    }

    render() {
        return <div className={this.state.showEditForm ? 'repository-meta open' : 'repository-meta'}>
            <div className='description-info'>
                <div className="repository-meta-content col-11">
              <span className="col-11 text-gray-dark">
                  {this.props.description}
              </span>
                </div>
                <button type="button"
                        onClick={this.toggleEditForm}
                        className="btn btn-sm float-right">
                    Edit
                </button>
            </div>
            <EditRepoDetailFormView description={this.props.description}/>
        </div>
    }
}
