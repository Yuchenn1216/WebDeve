

// use lit to create a script that can post to the blog
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { getUser } from '../auth.js';
import { BASE_URL } from '../config.js';

class TaskWidget extends LitElement {
    static properties = {
        user: { type: String, state: true },
        task_id: { type: String, state: true },
        task_text: { type: String, state: true },
        task_status: { type: String, state: true },
        loading: { type: Boolean, state: true },
    }

    static styles = css`
        :host {
            display: block;
            height:30%;
            width:100%;
            margin-bottom:80px; 
        }

        h2{
            font-family:Didot;
            margin-bottom:15px;
        }

        #submitForm{
            background-color:#E3DFFD;
            border-radius:15px;
            height:100%;
            width:100%;
        }

        textarea{
            border-radius: 5px;
            border-style: solid;
            border-width: 3px;
            border-color: #c0b8f5; 
            margin-top:10px; 
        }
        
        input{
            border-radius: 5px;
            border-style: solid;
            border-width: 3px;
            border-color: #c0b8f5; 
            background-color:white;
            margin-bottom:5px;
            cursor: pointer;
        }

        input:active {
            background-color:#c0b8f5; 
          }

        `;

    constructor() {
        super();
        this.taskUrl = `${BASE_URL}tasks?count=1`;
        this.postUrl = `${BASE_URL}tasks`;
        this.user = getUser();
    }

    connectedCallback() {
        super.connectedCallback();
        this.loading = true;
        this._fetch_get_task();
    }


    async _fetch_get_task() { 
        this.loading = true;
      const response = await fetch(this.taskUrl, {
        method: 'get',
        headers: { 'Authorization': `Basic ${this.user.token}`, 'Content-Type': 'application/json' },
      });
        const result = await response.json();
        this.task_id = result.tasks[0].id;
        this.task_text = result.tasks[0].text;
        this.task_status = result.tasks[0].status;
        this.loading = false;
    }

    async _fetch_post_task(event) {
        event.preventDefault(); // prevent form's default submission action
        this.loading = true;
        const text_post = event.target.elements.text.value;
        const response = await fetch(this.postUrl, {
            method: 'post',
            headers: { 'Authorization': `Basic ${this.user.token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "text": text_post,
            })
        });
        const result = await response.json();
        await this._fetch_get_task();
        this.loading = false;
    }

    // finish task
    async _fetch_finish_task(event) {
        event.preventDefault(); // prevent form's default submission action
        this.loading = true;
        const url = `${BASE_URL}tasks/${this.task_id}`;
        const response = await fetch(url, {
            method: 'post',
            headers: { 'Authorization': `Basic ${this.user.token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "status": "completed",
            })
        });
        const result = await response.json();
        await this._fetch_get_task();
        this.loading = false;
    }
  
  reloadWindow() {
    window.location.reload();
  }
    
    render() {
        if (this.loading) {
            return html`<p>Loading...</p>`; // show a loading message when loading
        }
        if (this.user == null) {
            return html`<p>Log in to show task</p>`
        }
        return html`
            <h2>Task information</h2>
            <p>Task id: ${this.task_id}</p>
            <p>Task text: ${this.task_text}</p>
            <p>Task status: ${this.task_status}</p>
            <h2>Post a task</h2>
            <form @submit=${this._fetch_post_task} id="submitForm">
                <div id="post-task">
                    <label for="text">text:</label>
                    <textarea name="text"></textarea><br><br>
                </div>
                <input type='submit' value='Post'>
            </form>
            <h2>Click when you finish the task</h2>
            <form @submit=${this._fetch_finish_task}>
                <input type='submit' value='Finish'>
            </form>`;
        }
}

customElements.define('task-widget',  TaskWidget);
