import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import axios from 'axios';
import './UserInfiniteScroll.css';



const { Meta } = Card;

export class UserInfiniteScroll extends Component {

    state = {
        users: []
    };

    componentDidMount() {

        axios.get('https://api.github.com/users')
            .then(response => {
                this.setState({ users: response.data })
                // Rate limit imposé par Github, on ne peut pas accéder à plus d'infos quand on utilise plusieurs profils
                //  "api.github.com/users/jamesgolick:1 Failed to load resource: the server responded with a status of 403 (rate limit exceeded)"
                // this.state.users.forEach(user => {
                //     console.log(user.login)
                //     axios.get('https://api.github.com/users/' + user.login)
                //         .then(response => {
                //             console.log(response)
                //         })
                // });
            })

        window.addEventListener('scroll', () => {
            // console.log(window.scrollY)
            // console.log(window.innerHeight)
            // console.log(document.body.scrollHeight), n'a pas fonctionné avec offsetHeight
            if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
                console.log(this.state.users[this.state.users.length - 1])

                const lastId = this.state.users[this.state.users.length - 1].id

                // rajoute les nouveaux users à la liste des users déjà chargés
                axios.get('https://api.github.com/users?since=' + lastId)
                    .then(response => this.setState({ users: this.state.users.concat(response.data) }))
            }
        })
    }

    render() {
        return (
            <div >
                <h1>Github users</h1>
                <div className="site-card-wrapper" >
                    <Row gutter={16}>
                        {this.state.users.map(user =>
                            <Col span={8} key={user.id}>
                                <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="avatar" src={user.avatar_url} />}
                                >
                                    <Meta title={user.login} description={user.url} />
                                </Card>
                            </Col>
                        )
                        }
                    </Row>
                </ div>
            </div >
        )
    }
}


