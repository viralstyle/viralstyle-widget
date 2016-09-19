# Viralstyle Embedded Campaign Widget
The Viralstyle Embedded Campaign Widget is the official way to include your Viralstyle campaign on your own webpage, complete with a safe and secure embedded checkout flow so your customers can purchase your products without ever leaving your site. We even allow you to include your own branding and customize the colors of the widget, allowing you to provide your customers with a fine-tuned experience of your own design.

Installing and using the widget requires a basic knowledge of HTML and Javascript.

## Installation
Embedding a Viralstyle campaign on your own webpage is a two step process. You must first include the jQuery library and Viralstyle jQuery plugin on your page, then use the plugin to create the widget. Both will be explained in greater depth below.

### Installing jQuery
If you aren't already using jQuery for other things on your site, you'll need to include the jQuery library on your page. There are several ways to do this, and the [official jQuery site](http://jquery.com/download/) goes into greater detail about different methods. The copy-and-paste solution is to use a CDN, of which there are a few to choose from. Here we've included the code snippet for Google's:
```html
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
```
Simply copy the above code and paste it in between your page's `<head></head>` tags, or wherever you include the majority of your scripts.

If you're already familiar with [Bower](https://bower.io) or [NPM](https://www.npmjs.com), jQuery is also available to download using either of those methods, as is the Viralstyle jQuery plugin.

### Installing the Viralstyle jQuery Plugin
Head over to our [releases](https://github.com/viralstyle/viralstyle-widget/releases) page and grab the latest version of the plugin. Once you've uploaded it to your site, include the Viralstyle `<script>` tag immediately after the jQuery `<script>` tag:
```html
<script type="text/javascript" src="..path/to/your/jquery.min.js"></script>
<script type="text/javascript" src="..path/to/your/viralstyle.jquery.js"></script>
```

The Viralstyle plugin is also available via NPM and Bower.

#### Installing via NPM
```bash
npm install --save git+ssh://github.com/viralstyle/viralstyle-widget.git
```

#### Installing via Bower
```bash
bower install --save git+ssh://github.com/viralstyle/viralstyle-widget.git
```

## Usage
Once the Viralstyle plugin is loaded on your page, you can begin embedding campaigns. Paste the code you were provided on your campaign settings page in a `<script>` tag, passing in the selector for the element in which you want the embedded widget to appear.

**Important:** The element you pass to the Viralstyle plugin must exist *before* the plugin is called.

```html
<script type="text/javascript">
  $(document).ready(function() {
    $('#widget').viralstyle({
        // Required Params:
        user: 'test-client',
        campaign: 'sales-flow-test-cart',
        product: 6,
        // Optional Params:
        background: '#2E3641',
        buttons: '#007087',
        accent: '#1FBBA6',
        logo: 'http://example.com/images/custom-logo.png'
      });
  });
</script>
```

### Required Parameters
#### User
`user` is the username that appears in the URL of your campaign sales page on viralstyle.com.
e.g. `viralstyle.com/YOUR-USERNAME/test-campaign`

#### Campaign
`campaign` is the public campaign name that appears in the URL of your sales page on viralstyle.com.
e.g. `viralstyle.com/test-client/YOUR-CAMPAIGN`

#### Product
`product` is ID of the type of product you want to appear in the widget, such as a women's tshirt or unisex long sleeve. This number will be provided by the embed code builder on the campaign's settings page, but if you'd like to set it yourself, it's the number that appears after `#pid=` in your campaign's url after selecting the desired product from the drop-down menu.
e.g. `viralstyle.com/test-client/test-campaign#pid=1`

**Important:** This must be a valid ID for an active product on your campaign. Choosing an ID for a product that has been deactivated or removed from your campaign, or one which is not a valid product ID will result in the widget failing to load. All of the colors you've chosen to offer that product in will be offered to the user in the widget.

### Optional Parameters
#### Background, Buttons, and Accent
`background`, `buttons`, and `accent` are optional and can be any valid CSS color. This includes colors defined by hex codes: `#2E3641`, or any of the [web color names](https://en.wikipedia.org/wiki/Web_colors#HTML_color_names) recognized by browsers.

`background` will change the background of the header of the checkout flow, and the background of the footer of the widget.
`buttons` will change the background color of the buttons.
`accent` will change the color of certain highlighted texts, such as product prices.

#### Logo
`logo` is optional and can be any valid full URL of an image you wish to display as your logo. If omitted, the Viralstyle logo will be displayed instead.

**Important:** There are no hard restrictions on the dimensions of your custom logo, but all logos will be proportionally scaled to a height of 85 pixels regardless of their dimensions and the sales flow has a maximum width of 600 pixels. Given these restraints, an ideal logo size would be 450px by 85px, or 900px by 170px for HiDPI and Retina displays.
