<?php

class ApiV1ClientsController extends Zend_Controller_Action
{

    public function init()
    {
        $config = new Zend_Config(require_once APPLICATION_PATH . '/configs/alegra_config.php');

        $this->user = $config->username;
        $this->token = $config->password;

        //$this->_helper->layout()->disableLayout();
    }

    public function indexAction()
    {
        $page = $this->hasParam('page') ? $this->getParam('page') : 1;
        $start = $this->hasParam('start') ? $this->getParam('start') : 0;
        $limit = $this->hasParam('limit') ? $this->getParam('limit') : 25;
        $order_field = $this->hasParam('order_field') ? $this->getParam('order_field') : 'id';
        $order_direction = $this->hasParam('order_direction') ? $this->getParam('order_direction') : 'ASC';
        $type = $this->hasParam('type') ? $this->getParam('type') : null;

        $url = "https://app.alegra.com/api/v1/contacts?metadata=true&page=$page&start=$start&limit=$limit&order_field=$order_field&order_direction=$order_direction&type=$type";
        $client = new Zend_Http_Client($url);
        $client->setHeaders('WWW-Authenticate');
        $client->setAuth($this->user, $this->token, Zend_Http_Client::AUTH_BASIC);

        $response = $client->request('GET');

        $this->getResponse()->setHttpResponseCode($response->getStatus());
        $this->_helper->json(json_decode($response->getBody()));
    }

    public function postAction()
    {
        $inputs = $this->getRequest()->getPost();

        $inputs['seller'] = (isset($inputs['seller']) && $inputs['seller'] >= 1) ? $inputs['seller'] : null;
        $inputs['term'] = (isset($inputs['term']) && $inputs['term'] >= 1) ? $inputs['term'] : null;
        $inputs['priceList'] = (isset($inputs['priceList']) && $inputs['priceList'] >= 1) ? $inputs['priceList'] : null;

        $inputs['type'] = [
            (isset($inputs['isClient']) && $inputs['isClient'] == 'yes') ? 'client' : null,
            (isset($inputs['isProvider']) && $inputs['isProvider'] == 'yes') ? 'provider' : null,
        ];

        $inputs['address'] = [
            'address' => isset($inputs['address']) ? $inputs['address'] : null,
            'city' => isset($inputs['city']) ? $inputs['city'] : null,
        ];

        $url = 'https://app.alegra.com/api/v1/contacts';
        $client = new Zend_Http_Client($url);
        $client->setHeaders('WWW-Authenticate');
        $client->setAuth($this->user, $this->token, Zend_Http_Client::AUTH_BASIC);
        $client->setRawData(json_encode($inputs), 'application/json');

        $response = $client->request('POST');
        $data = $response->getBody();

        $this->getResponse()->setHttpResponseCode($response->getStatus());
        $this->_helper->json(json_decode($response->getBody()));
    }

    public function getAction()
    {
        $id = $this->getParam("id");
        $url = 'https://app.alegra.com/api/v1/contacts/' . $id;
        $client = new Zend_Http_Client($url);
        $client->setHeaders('WWW-Authenticate');
        $client->setAuth($this->user, $this->token, Zend_Http_Client::AUTH_BASIC);

        $response = $client->request('GET');
        $data = $response->getBody();

        $this->getResponse()->setHttpResponseCode($response->getStatus());
        $this->_helper->json(json_decode($response->getBody()));
    }

    public function putAction()
    {
        $inputs = $this->getRequest()->getPost();

        $inputs['seller'] = (isset($inputs['seller']) && $inputs['seller'] >= 1) ? $inputs['seller'] : null;
        $inputs['term'] = (isset($inputs['term']) && $inputs['term'] >= 1) ? $inputs['term'] : null;
        $inputs['priceList'] = (isset($inputs['priceList']) && $inputs['priceList'] >= 1) ? $inputs['priceList'] : null;

        $inputs['type'] = [
            (isset($inputs['isClient']) && $inputs['isClient'] == 'yes') ? 'client' : null,
            (isset($inputs['isProvider']) && $inputs['isProvider'] == 'yes') ? 'provider' : null,
        ];

        $inputs['address'] = [
            'address' => isset($inputs['address']) ? $inputs['address'] : null,
            'city' => isset($inputs['city']) ? $inputs['city'] : null,
        ];

        $id = $this->getParam("id");
        $url = 'https://app.alegra.com/api/v1/contacts/' . $id;
        $client = new Zend_Http_Client($url);
        $client->setHeaders('WWW-Authenticate');
        $client->setAuth($this->user, $this->token, Zend_Http_Client::AUTH_BASIC);
        $client->setRawData(json_encode($inputs), 'application/json');

        $response = $client->request('PUT');
        $data = $response->getBody();

        $this->getResponse()->setHttpResponseCode($response->getStatus());
        $this->_helper->json(json_decode($response->getBody()));
    }

    public function deleteAction()
    {
        $id = $this->getParam("id");
        $url = 'https://app.alegra.com/api/v1/contacts/' . $id;
        $client = new Zend_Http_Client($url);
        $client->setHeaders('WWW-Authenticate');
        $client->setAuth($this->user, $this->token, Zend_Http_Client::AUTH_BASIC);

        $response = $client->request('DELETE');
        $data = $response->getBody();

        $this->getResponse()->setHttpResponseCode($response->getStatus());
        $this->_helper->json(json_decode($response->getBody()));
    }
}
