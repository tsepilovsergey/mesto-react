class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    editProfile({ name, about }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(res => {
            return this._getResponseData(res);
        });
    }

    addNewCard({ name, link }) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(res => {
            return this._getResponseData(res);
        });
    }

    editAvatar({ avatar }) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then(res => {
            return this._getResponseData(res);
        });
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => {
            return this._getResponseData(res);
        });
    }

    deleteLike(cardId, isLiked) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this._headers
        })
        .then(res => {
            return this._getResponseData(res);
        });
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(res => {
            return this._getResponseData(res);
        });
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then(res => {
            return this._getResponseData(res);
        });
    }

}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
    headers: {
        authorization: '54bcf370-1275-4b3b-905f-be3c184c4a5c',
        'Content-Type': 'application/json'
    }
});

export default api;
