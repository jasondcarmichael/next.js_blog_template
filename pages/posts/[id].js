import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';

export async function getStaticProps({ params }) {

    // Add the await keyword
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

// 'paths' contains array of known paths returned by getAllPostIds()

export default function Post({ postData }) {
    return (
    <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>

        {postData.title}
        <br />
        {postData.id}
        <br />
        <Date dateString={postData.date} />
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
    );
}