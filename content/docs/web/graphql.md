---
title: GraphQL
---

## Introspection Query

```graphql {linenos=table,filename="query"}
{
    __schema {
        queryType {
            name
        }
        mutationType {
            name
        }
        subscriptionType {
            name
        }
        types {
            ...FullType
        }
        directives {
            name description locations args {
                ...InputValue
            }
        }
    }
}
fragment FullType on __Type {
    kind name description fields(includeDeprecated: true) {
        name description args {
            ...InputValue
        }
        type {
            ...TypeRef
        }
        isDeprecated deprecationReason
    }
    inputFields {
        ...InputValue
    }
    interfaces {
        ...TypeRef
    }
    enumValues(includeDeprecated: true) {
        name description isDeprecated deprecationReason
    }
    possibleTypes {
        ...TypeRef
    }
}
fragment InputValue on __InputValue {
    name description type {
        ...TypeRef
    }
    defaultValue
}
fragment TypeRef on __Type {
    kind name ofType {
        kind name ofType {
            kind name ofType {
                kind name ofType {
                    kind name ofType {
                        kind name ofType {
                            kind name ofType {
                                kind name
                            }
                        }
                    }
                }
            }
        }
    }
}
```

```graphql {filename="inline"}
{__schema{queryType{name}mutationType{name}subscriptionType{name}types{...FullType}directives{name description locations args{...InputValue}}}}fragment FullType on __Type{kind name description fields(includeDeprecated:true){name description args{...InputValue}type{...TypeRef}isDeprecated deprecationReason}inputFields{...InputValue}interfaces{...TypeRef}enumValues(includeDeprecated:true){name description isDeprecated deprecationReason}possibleTypes{...TypeRef}}fragment InputValue on __InputValue{name description type{...TypeRef}defaultValue}fragment TypeRef on __Type{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name}}}}}}}}
```

## Tools

- [GraphQL Voyager](https://apis.guru/graphql-voyager/)
- [GraphQLmap](https://github.com/swisskyrepo/GraphQLmap)

## Challenges

### Root-Me

- [GraphQL - Injection](https://www.root-me.org/fr/Challenges/Web-Serveur/GraphQL-Injection)
- [GraphQL - Introspection](https://www.root-me.org/fr/Challenges/Web-Serveur/GraphQL-Introspection)
- [GraphQL - Backend injection](https://www.root-me.org/fr/Challenges/Web-Serveur/GraphQL-Backend-injection)

### Portswigger

- [Performing CSRF exploits over GraphQL \| Web Security Academy](https://portswigger.net/web-security/graphql/lab-graphql-csrf-via-graphql-api)
- [Bypassing GraphQL brute force protections \| Web Security Academy](https://portswigger.net/web-security/graphql/lab-graphql-brute-force-protection-bypass)
- [Finding a hidden GraphQL endpoint \| Web Security Academy](https://portswigger.net/web-security/graphql/lab-graphql-find-the-endpoint)
- [Accidental exposure of private GraphQL fields \| Web Security Academy](https://portswigger.net/web-security/graphql/lab-graphql-accidental-field-exposure)
- [Accessing private GraphQL posts \| Web Security Academy](https://portswigger.net/web-security/graphql/lab-graphql-reading-private-posts)

## Resources

- [PayloadsAllTheThings - GraphQL Injection](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/GraphQL%20Injection)
- [GraphQL - HackTricks](https://book.hacktricks.xyz/network-services-pentesting/pentesting-web/graphql)
- [GraphQL - OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html)
