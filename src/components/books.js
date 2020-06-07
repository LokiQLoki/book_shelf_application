import React, { Component, setGlobal } from 'reactn';
import { get } from '../util/service';
class Books extends Component {

    componentDidMount() {
        get('/books')
            .then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    if (res.data.error === false) {
                        // console.log(res.data.output)
                        setGlobal({
                            books: res.data.output
                        })
                    }
                }
                else {
                    alert('Something went wrong, Please try again')
                }
            })
    }

    render() {
        // const { books } = getGlobal()
        // console.log(books)
        return (
            <div className="col-md-6  left-text">
                {
                    this.global.books.length > 0
                        ?

                        this.global.books.map((book, i) => (

                            <div className="card margintop-20" key={i}>
                                <div className="card-body">
                                    <h5 className="card-title">{book.book_name}</h5>
                                    <p className="card-text">{book.author}</p>
                                </div>
                            </div>

                        ))
                        :
                        <div className="card margintop-20">
                            <div className="card-body">
                                <p className="card-text">No books available.</p>
                            </div>
                        </div>

                }

            </div>
        )
    }
}

export default Books;