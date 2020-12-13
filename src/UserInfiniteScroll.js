import React, { Component } from 'react';
import { Card } from 'antd';
import axios from 'axios';


const { Meta } = Card;

export class UserInfiniteScroll extends Component {
    state = { users: [] };

    componentDidMount() {
        axios.get('https://api.github.com/users')
            .then(response => this.setState({ users: response.data }))
    }

    render() {
        return (
            <div>
                {this.state.users.map(user =>

                    <Card key={user.id}
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src={user.avatar_url} />}
                    >
                        <Meta title={user.login} description={user.description} />
                    </Card>
                )
                }
            </div>
        )
    }
}

