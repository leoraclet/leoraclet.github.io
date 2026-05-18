---
title: Privilege Escalation
---

## Steps

### Reconnaissance

{{% steps %}}

#### Check SUDO permissions

With the following command, you can check what actions the current user can do as sudo, which is useful to know to escalate privileges.

```bash
sudo -l # https://www.man7.org/linux/man-pages/man8/sudo.8.html
```

#### Look for SETUID

Files with the [setuid](https://en.wikipedia.org/wiki/Setuid) bit set are executed with the permissions of the owner of the file, not the user who started the program. This can be used to escalate privileges.

You can use the following command to find all files/executables with the **setuid** bit set.

```bash
find / -perm -u=s -type f 2>/dev/null
```

{{% /steps %}}

### Exploitation

{{% steps %}}

#### SETUID binaries

This [website](https://gtfobins.org/) collects legitimate functions of Unix-like executables that can be abused to break out of restricted shells, escalate or maintain elevated privileges, transfer files, spawn bind and reverse shells, and facilitate other post-exploitation tasks.

If it is a custom program or executable, you can refer to the [Binary Exploitation](../../pwn) section of my notes.

For Windows systems, you can use the [LOLBAS](https://lolbas-project.github.io/#) website as a reference.

{{% /steps %}}
