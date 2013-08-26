!function (repos, add_template) {
    var fork_flag = document.querySelector('.fork-flag a');

    if (repos.hasOwnProperty(fork_flag.innerText)) {
        add_template(repos[fork_flag.innerText]);
    }
}(
    {
        'symfony/symfony': 'code',
        'symfony/symfony-standard': 'code',
        'symfony/symfony-docs': 'doc',

        'symfony-cmf/symfony-cmf-docs': 'doc',
        'symfony-cmf/BlockBundle': 'code',
        'symfony-cmf/BlogBundle': 'code',
        'symfony-cmf/cmf-utils': 'code',
        'symfony-cmf/ContentBundle': 'code',
        'symfony-cmf/CoreBundle': 'code',
        'symfony-cmf/CreateBundle': 'code',
        'symfony-cmf/DoctrinePHPCRBundle': 'code',
        'symfony-cmf/MediaBundle': 'code',
        'symfony-cmf/MenuBundle': 'code',
        'symfony-cmf/Routing': 'code',
        'symfony-cmf/RoutingAutoBundle': 'code',
        'symfony-cmf/RoutingBundle': 'code',
        'symfony-cmf/RoutingExtraBundle': 'code',
        'symfony-cmf/SearchBundle': 'code',
        'symfony-cmf/SimpleCmsBundle': 'code',
        'symfony-cmf/SonataAdminBundle': 'code',
        'symfony-cmf/SonataBlockBundle': 'code',
        'symfony-cmf/symfony-cmf-standard': 'code',
        'symfony-cmf/cmf-sandbox': 'code',
        'symfony-cmf/symfony-cmf-website': 'code',
        'symfony-cmf/symfony-cmf': 'code',
        'symfony-cmf/Testing': 'code',
        'symfony-cmf/TreeBrowserBundle': 'code'
    },
    function (type) {
        var pr_start = document.querySelector('.discussion-bubble-content');

        pr_start.addEventListener('click', function (e) {
            var pr_body = document.querySelector('#pull_request_body');
            var template;

            var branch_name = document.querySelector('.branch-name:nth-child(3)').innerText.split(':')[1];

            var fixed;
            var bug_fix;
            var feature;
            if (fixed = branch_name.match(/(fix|issue)(?:_|-|\/)(.*?)$/)) {
                if ('fix' === fixed[1]) {
                    bug_fix = true;
                }

                fixed = '#' + fixed[2];
            } else {
                fixed = '-';
            }

            bug_fix = (true === bug_fix ? 'yes' : '[yes|no]');

            switch (type) {
                case 'code':
                    feature = (branch_name.match(/^add/) ? 'yes' : '[yes|no]');

                    template  = "| Q             | A\n";
                    template += "| ------------- | ---\n";
                    template += "| Bug fix?      | " + bug_fix + "\n";
                    template += "| New feature?  | " + feature + "\n";
                    template += "| BC breaks?    | [yes|no]\n";
                    template += "| Deprecations? | [yes|no]\n";
                    template += "| Tests pass?   | [yes|no]\n";
                    template += "| Fixed tickets | " + fixed + "\n";
                    template += "| License       | MIT\n";
                    template += "| Doc PR        | [The reference to the documentation PR if any]\n";
                    break;

                case 'doc':
                    feature = (branch_name.match(/^(document|doc|add)/) ? 'yes' : '[yes|no]');

                    template  = "| Q             | A\n";
                    template += "| ------------- | ---\n";
                    template += "| Doc fix?      | " + bug_fix + "\n";
                    template += "| New docs?     | " + feature + " (PR # on symfony/symfony if applicable)\n";
                    template += "| Applies to    | [Symfony version numbers this applies to]\n";
                    template += "| Fixed tickets | " + fixed + "\n";
                    break;
            }

            pr_body.innerHTML = template;
        }, false);
    }
);
