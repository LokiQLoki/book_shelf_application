import React,{ setGlobal} from 'reactn';
import { post } from '../util/service';
class AppForm extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {
                book_name: '',
                author: ''
            },
            validation: {
                book_name: '',
                author: ''
            },
            loading: false
        }
    }

    //store data from input box
    handleChange = (e, name) => {
        let data = { ...this.state.data };
        data[name] = e.target.value;
        this.validateInput(e, name);
        this.setState({
            data
        })
    }

    //validation input 
    validateInput = (e, name) => {
        let validation = { ...this.state.validation };
        let value = e.target.value;
        switch (name) {
            case 'book_name':
                if (value === '') {
                    validation[name] = 'Please enter book name';
                }
                else {
                    validation[name] = '';
                }
                break;
            case 'author':
                if (value === '') {
                    validation[name] = 'Please enter author name';
                }
                else {
                    validation[name] = '';
                }
                break;
            default:
                break;
        }
        this.setState({
            validation
        })
    }

    //submit the from
    submitForm = (e) => {
        e.preventDefault();
        const data = { ...this.state.data }
        this.setState({
            loading: true
        })
        post('/books', data)
            .then((res) => {
                this.setState({
                    loading: false
                })
                // console.log(res)
                if (res.status === 201) {
                    if (res.data.status === 'success') {
                        // console.log(res.data.output)
                        let books = [...this.global.books];
                        books.unshift(data);
                        setGlobal({
                            books
                        })
                        alert(res.data.message)
                    }
                }
                else {
                    alert('Something went wrong, Please try again')
                }
            })
    }

    render() {
        const { book_name, author } = this.state.validation;
        return (
            <div className="col-md-4 margintop-20">
                <div className="card bg-light mb-3">
                    <div className="card-header">Enter book details</div>
                    <div className="card-body left-text">
                        <form onSubmit={(e) => this.submitForm(e)}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Book name</label>
                                <input
                                    type="text"
                                    defaultValue={this.state.data.book_name}
                                    className="form-control"
                                    placeholder="Enter book name"
                                    onChange={(e) => this.handleChange(e, 'book_name')}
                                    onBlur={(e) => this.validateInput(e, 'book_name')}
                                />
                                <small className="form-text text-muted error">{book_name}</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Author name</label>
                                <input
                                    type="text"
                                    defaultValue={this.state.data.author}
                                    className="form-control"
                                    placeholder="Enter author name"
                                    onChange={(e) => this.handleChange(e, 'author')}
                                    onBlur={(e) => this.validateInput(e, 'author')}
                                />
                                <small className="form-text text-muted error">{author}</small>
                            </div>
                            <button
                                disabled={
                                    this.state.loading ||
                                    this.state.data.book_name === '' ||
                                    this.state.data.author === '' ||

                                    this.state.validation.book_name !== '' ||
                                    this.state.validation.author !== ''
                                }
                                type="submit"
                                className="btn btn-primary"
                            >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppForm;
