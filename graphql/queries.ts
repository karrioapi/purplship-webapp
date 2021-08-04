import { gql } from "@apollo/client";


export const GET_ADDRESS_TEMPLATES = gql`
query get_address_templates($offset: Int, $first: Int) {
  address_templates(offset: $offset, first: $first) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        is_default
        label
        address {
          company_name
          person_name
          address_line1
          address_line2
          postal_code
          residential
          city
          state_code
          country_code
          email
          phone_number
          validation
          validate_location
        }
        created_at
        updated_at
      }
    }
  }
}
`;

export const GET_CUSTOMS_TEMPLATES = gql`
query get_customs_info_templates($offset: Int, $first: Int) {
  customs_templates(offset: $offset, first: $first) {
    pageInfo { 
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        label
        is_default
        customs {
          aes
          eel_pfc
          incoterm
          content_type
          commercial_invoice
          certificate_number
          content_description
          duty {
            paid_by
            currency
            account_number
            declared_value
            bill_to {
              company_name
              person_name
              address_line1
              address_line2
              postal_code
              residential
              city
              state_code
              country_code
              email
              phone_number
              validation
              validate_location
            }
            id
          }
          invoice
          invoice_date
          signer
          certify
          commodities {
            id
            sku
            weight
            quantity
            weight_unit
            description
            value_amount
            value_currency
            origin_country
          }
        }
      }
    }
  }
}
`;

export const GET_DEFAULT_TEMPLATES = gql`
query get_default_templates {
  default_templates
}
`;

export const CREATE_CONNECTION = gql`
  mutation create_connection($data: CreateConnectionInput!) {
    create_connection(input: $data) {
      id
      errors {
        field
        messages
      }
    }
  }
`;

export const UPDATE_CONNECTION = gql`
  mutation update_connection($data: UpdateConnectionInput!) {
    update_connection(input: $data) {
      id
      errors {
        field
        messages
      }
    }
  }
`;

export const GET_ORGANIZATIONS = gql`
query get_organizations {
  organizations {
    id
    name
    slug
    token
    user {
      email
      full_name
      is_admin
    }
    users {
      email
      full_name
      is_admin
    }
  }
}
`;

export const DELETE_CONNECTION = gql`
  mutation delete_connection($data: DeleteConnectionInput!) {
    delete_connection(input: $data) {
      id
    }
  }
`;

export const CREATE_ORGANIZATION = gql`
  mutation create_organization($data: CreateOrganizationInput!) {
    create_organization(input: $data) {
      id
      errors {
        field
        messages
      }
    }
  }
`;

export const UPDATE_ORGANIZATION = gql`
  mutation update_organization($data: UpdateOrganizationInput!) {
    update_organization(input: $data) {
      id
      errors {
        field
        messages
      }
    }
  }
`;

export const GET_LOG = gql`
query get_log($id: Int!) {
  log(id: $id) {
    id
    username_persistent
    requested_at
    response_ms
    path
    view
    view_method
    remote_addr
    host
    method
    query_params
    data
    response
    errors
    status_code
  }
}
`;

export const GET_LOGS = gql`
query get_logs($offset: Int, $first: Int, $status: String) {
  logs(offset: $offset, first: $first, status: $status) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        view
        view_method
        path
        data
        method
        response_ms
        remote_addr
        requested_at
        username_persistent
        status_code
        query_params
        host
        errors
        response
      }
    }
  }
}
`;

export const GET_PARCEL_TEMPLATES = gql`
query get_parcel_templates($offset: Int, $first: Int) {
  parcel_templates(offset: $offset, first: $first) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        is_default
        label
        parcel {
          width
          height
          length
          dimension_unit
          weight
          weight_unit
          packaging_type
          package_preset
        }
        created_at
        updated_at
      }
    }
  }
}
`;

export const GET_SYSTEM_CONNECTIONS = gql`
query get_system_connections($test: Boolean) {
  system_connections(test: $test) {
    id
    carrier_id
    carrier_name
    test
    active
  }
}
`;

export const CREATE_TEMPLATE = gql`
  mutation create_template($data: CreateTemplateInput!) {
    create_template(input: $data) {
      id
      errors {
        field
        messages
      }
    }
  }
`;

export const UPDATED_TEMPLATE = gql`
  mutation update_template($data: UpdateTemplateInput!) {
    update_template(input: $data) {
      id
      errors {
        field
        messages
      }
    }
  }
`;

export const DELETE_TEMPLATE = gql`
  mutation delete_template($data: DeleteTemplateInput!) {
    delete_template(input: $data) {
      id
    }
  }
`;

export const DISCARD_COMMODITY = gql`
  mutation discard_commodity($data: DiscardCommodityInput!) {
    discard_commodity(input: $data) {
      id
    }
  }
`;

export const MUTATE_TOKEN = gql`
mutation mutate_token($data: TokenMutationInput!) {
  mutate_token(input: $data) {
    token {
      key
    }
  }
}
`;

export const GET_TOKEN = gql`
  query GetToken($org_id: String) {
    token(org_id: $org_id) {
      key
      created
    }
  }
`;

export const GET_USER_CONNECTIONS = gql`
  query get_user_connections($test: Boolean) {
    user_connections(test: $test) {
      __typename
      ... on AramexSettings {
        id
        carrier_id
        carrier_name
        test
        active
        username
        password
        account_pin
        account_entity
        account_number
        account_country_code
      }
      ... on AustraliaPostSettings {
        id
        carrier_id
        carrier_name
        test
        active
        api_key
        password
        account_number
      }
      ... on CanadaPostSettings {
        id
        carrier_id
        carrier_name
        test
        active
        username
        password
        customer_number
        contract_id
      }
      ... on CanparSettings {
        id
        carrier_id
        carrier_name
        test
        active
        username
        password
      }
      ... on DHLExpressSettings {
        id
        carrier_id
        carrier_name
        test
        active
        site_id
        password
        account_number
      }
      ... on DHLUniversalSettings {
        id
        carrier_id
        carrier_name
        test
        active
        consumer_key
        consumer_secret
      }
      ... on DicomSettings {
        id
        carrier_id
        carrier_name
        test
        active
        username
        password
        billing_account
      }
      ... on EShipperSettings {
        id
        carrier_id
        carrier_name
        test
        active
        username
        password
      }
      ... on FedexSettings {
        id
        carrier_id
        carrier_name
        test
        active
        account_number
        password
        meter_number
        user_key
      }
      ... on FreightcomSettings {
        id
        carrier_id
        carrier_name
        test
        active
        username
        password
      }
      ... on PurolatorSettings {
        id
        carrier_id
        carrier_name
        test
        active
        username
        password
        account_number
        user_token
      }
      ... on RoyalMailSettings {
        id
        carrier_id
        carrier_name
        test
        active
        client_id
        client_secret
      }
      ... on SendleSettings {
        id
        carrier_id
        carrier_name
        test
        active
        sendle_id
        api_key
      }
      ... on SFExpressSettings {
        id
        carrier_id
        carrier_name
        test
        active
        partner_id
        check_word
      }
      ... on TNTSettings {
        id
        carrier_id
        carrier_name
        test
        active
        username
        password
        account_number
        account_country_code
      }
      ... on UPSSettings {
        id
        carrier_id
        carrier_name
        test
        active
        username
        password
        access_license_number
        account_number
      }
      ... on USPSSettings {
        id
        carrier_id
        carrier_name
        test
        active
        username
        password
        mailer_id
        customer_registration_id
        logistics_manager_mailer_id
      }
      ... on USPSInternationalSettings {
        id
        carrier_id
        carrier_name
        test
        active
        username
        password
        mailer_id
        customer_registration_id
        logistics_manager_mailer_id
      }
      ... on YanwenSettings {
        id
        carrier_id
        carrier_name
        test
        active
        customer_number
        license_key
      }
      ... on YunExpressSettings {
        id
        carrier_id
        carrier_name
        test
        active
        customer_number
        api_secret
      }
    }
  }
`;

export const MUTATE_USER = gql`
mutation mutate_user($data: UserMutationInput!) {
  mutate_user(input: $data) {
    email
    full_name
    is_staff
    last_login
    date_joined
    errors {
      field
      messages
    }
  }
}
`;

export const GET_USER = gql`
query GetUser {
  user {
    email
    full_name
    is_staff
    last_login
    date_joined
  }
}
`;
