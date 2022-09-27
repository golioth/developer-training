2. Create a file for WiFi and Golioth credentials

  :::tip
  Credentials allow your device to authenticate onto your local Wi-Fi network and then to talk to the Golioth servers.
  :::

  * **Option 1**: Reuse `credentials.conf` from previous examples
  * **Option 2**: Make a new `credentials.conf` (required if this is the first example you are running)
    * Make a copy of `credentials.conf_example` and name it `credentials.conf`

        ```
        cp credentials.conf_example credentials.conf
        ```

    * Edit this new file to include your WiFi credentials and the PSK-ID/PSK
    from the device page on your Golioth console
